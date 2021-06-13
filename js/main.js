
//forSideMenu
let currentCat = "now_playing"
async function getMoviesForMenu(query)
{
    let response
    if(query === "trending")
    {
        response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=3b8641394793ef404d6c989186e8719a`)
    }
    else
    {
        response = await fetch(`https://api.themoviedb.org/3/movie/${query}?api_key=3b8641394793ef404d6c989186e8719a`);
    }

    let data = await response.json();
    displayMovies(data.results)   
}

getMoviesForMenu(currentCat)
//for byWord Search
async function getMoviesByWord(word)
{
    let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=3b8641394793ef404d6c989186e8719a&query=${word}`)
    let data = await response.json()
    displayMovies(data.results)
}

//for search field

async function getMoviesByOriginalTitle()
{
    let response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=3b8641394793ef404d6c989186e8719a`)
    let data = await response.json()
    return data.results;
}




async function displayMovies(movie)
{

    
    $("#movieApi .row").empty()
    for(let i = 0; i<movie.length;i++)
    {
        $("#movieApi .row").append(`<div class="col-lg-4 col-md-6 col-12 px-5">
        <div class="movie position-relative w-100 m-3 shadow-lighter rounded">
            <div class="filmPoster">
                <img src="https://image.tmdb.org/t/p/w500`+movie[i].poster_path+`" alt="" class="img-fluid d-block mx-auto rounded">
            </div>
            <div class="filmDescription text-white text-center position-absolute d-flex flex-column justify-content-center p-5 rounded">
                <h2 class="movieTitle">${movie[i].title}</h2>
                <p class="movieOverview">${movie[i].overview.slice(0,150)} ....</p>
                <span class="MovieRate my-3">rate: ${movie[i].vote_average}</span>
                <span class="movieDate">${movie[i].release_date}</span>
            </div>
        </div>
    </div>
        `)
    }
}



$(".Links a[href = '#']").click(function(){
    currentCat = $(this).attr("id");
    getMoviesForMenu(currentCat)
})

//searchByWord
$(".byWord").keyup(function(){
    currentCat = $(this).val()
    if(currentCat != "")
    {
        getMoviesByWord(currentCat)
    }
    
})
//search
$(".searchOptions .search").keyup(async function(){
    let valueToSearch = $(this).val()
    let allMovies = await getMoviesByOriginalTitle();
    
    let res = []
    for(let i=0;i<allMovies.length;i++)
    {
        
        if(allMovies[i].original_title.includes(valueToSearch))
        {
            res.push(allMovies[i]);
            displayMovies(res);
        }
    }   

})




let nameRegx = /^[A-z]{3,20}$/
let emailRegx = /\S+@\S+\.\S+/
let phoneRegx = /^(01)[015]{1}[0-9]{8}$/
let ageRegx = /^[0-9]{1,2}$/
let pwRegx = /^[+A-z+0-9]{8,}/
$("#contactUs input").keyup(function()
{

    let currentId = $(this).attr("id")
    let currentRegx
    
    let value = $(this).val()

    if(currentId === "name")
    {
        currentRegx = nameRegx
    }
    else if(currentId === "email")
    {
        currentRegx = emailRegx
    }
    else if(currentId === "telephone")
    {
        currentRegx = phoneRegx;
    }
    else if(currentId === "age" )
    {
        currentRegx = ageRegx
    }
    else if(currentId === "pw" || currentId === "CmfPw")
    {
        currentRegx = pwRegx
    }
    //validation
    if(currentRegx.test(value) == true)
    {
        
        if(currentId === "CmfPw" )
        {
            if($(this).val() === $("#pw").val())
            {
                $(this).next().fadeOut(200)

            }
            else
            {
                $(this).next().fadeIn(200)

            }
        }

       else{
            $(this).next().fadeOut(200)
       }

            
    }
    else
    {
            $(this).next().fadeIn(200)
    }

})


$("#contactUs .btn").click(function(){
    $(this).addClass("btnShadow")
})



let navInnererWidth = $(".navigation").width();
$(".navigation").css("left",`-${navInnererWidth}`)
$(".sideBar").css("left","0")
let arr=[]
let count = 0
while(count < 6)
{
    arr.push($(".Links a").eq(count).offset().top)
    count++;
}
count = 0
let cHeight = $(".Links ul").outerHeight(true)
while(count < 6)
{
    $(".Links a").eq(count).animate({top:cHeight})
    count++;
}
$(".toggleIcon i").click(function(){
    
    if($(".sideBar").css("left") === "0px")
    {
        let delay = 1000
        for(let i = 0;i < arr.length; i+=1)
        {
            delay+=150
            setTimeout(function(){
                $(".Links ul").children().eq(i).find("a").animate({top:arr[i]},200)
            },delay)
            
            
        }
        $(this).hide()
        $(this).next().show()
        $(".sideBar").animate({left:`${navInnererWidth}`},500)
        $(".navigation").animate({left:"0"},500)
    }
    else
    {
        count = 0;
        while(count < 6)
        {
           
            $(".Links a").eq(count).animate({top:cHeight},200)
            count++;
        }
        $(this).hide()
        $(this).prev().show()
        $(".sideBar").animate({left:"0"},500)
        $(".navigation").animate({left:`-${navInnererWidth}`},500)
    }
})














