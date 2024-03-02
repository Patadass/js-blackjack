let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

function create_decK_of_playing_cards(){
    let deck = [];
    let suits = ['H','D','C','S'];
    let pos = 0;
    for(let i = 0;i < suits.length;i++){
        for(let j = pos;j < 13 + pos;j++){
            deck[j] = ((j-pos)+1).toString() + suits[i];
        }
        pos += 13;
    }
    return deck;
}

function remove_from_deck(card,deck){
    for(let i = 0;i < deck.length;i++){
        if(card === deck[i]){
            deck[i] = '0';
            return deck;
        }
    }
}


function onload(){
    let img = new Image();
    img.onload = () => {
        ctx.drawImage(img,0,0,200,200);
    };
    img.src = "Playing_Cards/Playing_Cards/PNG-cards-1.3/2_of_clubs.png";
    let deck = create_decK_of_playing_cards();
    let pos = Math.floor(Math.random()*52);
    console.log(deck[pos])
    deck = remove_from_deck(deck[pos],deck);
    console.log(deck);

}