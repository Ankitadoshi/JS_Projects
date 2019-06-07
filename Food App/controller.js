var Foodapp = {
    data: null,
    favourites:[],
    recipes: [],
    curr_item: null,
    cart_items:0,
    init: function(){
        Foodapp.getData();
    },
    getData: function(){
        fetch('http://temp.dash.zeta.in/food.php').then(function(response){
            return response.json();
        }).then(function(data){
            Foodapp.data=data;
            Foodapp.categories=Foodapp.data.categories;
            Foodapp.recipes = Foodapp.data.recipes;
            Foodapp.buildFavourites();
            Foodapp.buildCategories();
            Foodapp.buildItems();
        });
    },
    buildFavourites: function(){
        for(var i=0; i<Foodapp.recipes.length; i++){
            if(Foodapp.recipes[i].isFavourite){
                Foodapp.favourites.push(Foodapp.recipes[i]);
            }
        }
        var $favourite = $('.favourite');
        for(var j=0; j<Foodapp.favourites.length; j++){
            var $temp = $('<div class="fav_container col"><img src="'+Foodapp.favourites[j].image+'"></img><div class="row center"><div class="col"><div class="name">'+Foodapp.favourites[j].name+'</div><div class="amt">$'+Foodapp.favourites[j].price+'</div></div><button class="reorder">Reorder</button></div></div>');
            $favourite.append($temp);
        }
        
    },
    buildCategories: function(){
        var $categories = $('.categories');
        for(var i=0; i<Foodapp.categories.length; i++){
            var $temp =$('<div class="category row cen"><img class="cat-img" src="'+Foodapp.categories[i].image+'"></img><div class="cat_name">'+Foodapp.categories[i].name+'</div></div>');
            $categories.append($temp); 
        }
        var firstCat = $('.categories').find('.category:first-child');
        firstCat.addClass('highlight');
    },
    buildItems: function(){
        var $item_container = $('.item_container');
        for(var i=0; i<Foodapp.recipes.length; i++){
            if(Foodapp.recipes[i].category === Foodapp.categories[0].name){
                var $temp = $('<div class="item col" id="'+i+'"><img class="item_img" src="'+Foodapp.recipes[i].image+'"></img><div class="row center"><div class="col"><div class="name">'+Foodapp.recipes[i].name+'</div><div class="amt">$'+Foodapp.recipes[i].price+'</div></div><button class="add">Add To Bag</button></div></div>');
                $item_container.append($temp);
            }
        }
    },
    openPage: function(item){
        $('.favourite_container').addClass('hide');
        $('.main_container').addClass('hide');
        var $details_page = $('.details_page');
        var $temp=$('<img src="'+item.image+'"></img><div class="row center"><div class="col"><div class="name">'+item.name+'</div><div class="amt">$'+item.price+'</div></div><button class="add">Add To Bag</button></div><hr></div>');
        var $temp1 = $('<div class="col"><div class="row center"><div>Category: '+item.category+'</div><div>'+item.rating+' Rating, {'+item.reviews+' Reviews}</div></div></div>');
        var $temp2 = $('<h2>Details</h2><p>'+item.details+'</p>')
        $details_page.append($temp);
        $details_page.append($temp1);
        $details_page.append($temp2);
        $details_page.removeClass('hide');
    },
    filterCategories: function(categoryName){
        var $item_container = $('.item_container');
        $item_container.empty();
        for(var i=0; i<Foodapp.recipes.length; i++){
            if(Foodapp.recipes[i].category === categoryName){
                var $temp = $('<div class="item col" id="'+i+'"><img class="item_img" src="'+Foodapp.recipes[i].image+'"></img><div class="row center"><div class="col"><div class="name">'+Foodapp.recipes[i].name+'</div><div class="amt">$'+Foodapp.recipes[i].price+'</div></div><button class="add">Add To Bag</button></div></div>');
                $item_container.append($temp);
            }
            
        }
    }
    
}
$(document).ready(function(){
    Foodapp.init();
    $(document).on('click', function(event){
        if($(event.target).parent().hasClass('category')){ 
            $('.highlight').removeClass('highlight');
            $(event.target).parent().addClass('highlight');
            Foodapp.filterCategories($(event.target).text());

        }
        if($(event.target).parent().hasClass('item')){
            var num = $(event.target).parent().attr('id');
            Foodapp.curr_item = Foodapp.recipes[parseInt(num)];
            Foodapp.openPage(Foodapp.curr_item);

        }
        if($(event.target).hasClass('add')){
            Foodapp.cart_items = Foodapp.cart_items+1;
            $('.cart_value').text(Foodapp.cart_items);
        }
        if($(event.target).hasClass('reorder')){
            Foodapp.cart_items = Foodapp.cart_items+1;
            $('.cart_value').text(Foodapp.cart_items);
        }
    })
});