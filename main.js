function get_random_int(from){
    return Math.floor(Math.random()*from);
}

function get_src_of_image_from_card(card){
    let lastC = card[card.length-1];
    let suit
    switch (lastC){
        case 'H':
            suit = 'hearts';
            break;
        case 'D':
            suit = 'diamonds';
            break;
        case 'C':
            suit = 'clubs';
            break;
        case 'S':
            suit = 'spades';
            break;
    }
    let number;
    if(parseInt(card) > 10){
        if(parseInt(card) === 11){
            number = 'jack';
        }
        if(parseInt(card) === 12){
            number = 'queen';
        }
        if(parseInt(card) === 13){
            number = 'king';
        }
    }else{
        number = parseInt(card).toString();
        if(parseInt(card) === 1){
            number = 'ace';
        }
    }
    if(parseInt(card) > 10){
        return "Playing_Cards/" + number + "_of_" + suit + "2.png";
    }
    return "Playing_Cards/" + number + "_of_" + suit + ".png";
}

let deck = create_decK_of_playing_cards();

function draw_label(text,x,y,font_size = 40){
    ctx.beginPath();
    ctx.font = font_size + "px Arial";
    ctx.globalAlpha = 1;
    ctx.fillStyle = "black";
    ctx.fillText(text,x,y);
    ctx.stroke();
}

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

function remove_from_deck(card){
    for(let i = 0;i < deck.length;i++){
        if(card === deck[i]){
            deck[i] = '0';
            return deck;
        }
    }
}

let player_state = []
let dealer_state = []
let is_hide_dealer_card = true;

function start_deal(){
    is_hide_dealer_card = true;
    deck = create_decK_of_playing_cards();
    player_state = []
    dealer_state = []
    let card = get_new_card_from_deck();
    deck = remove_from_deck(card);
    player_state.push(card);

    card = get_new_card_from_deck();
    deck = remove_from_deck(card);
    dealer_state.push(card);

    card = get_new_card_from_deck();
    deck = remove_from_deck(card);
    player_state.push(card);

    card = get_new_card_from_deck();
    deck = remove_from_deck(card);
    dealer_state.push(card);
    draw_state_of_play();
}

function get_text_from_cards(){
    //
    //placeholder before coding the graphics
    //
    let player_text = "",dealer_text = "";
    console.log("player:");
    let player_sum = get_sum_from_player_state();
    let dealer_sum = get_sum_from_dealer_state();
    if(dealer_state > 2){
        let dealer_sum = get_sum_from_dealer_state(false);
    }
    if(player_sum[0] === player_sum[1]){
        console.log(player_state,player_sum[0]);
        player_text = player_sum[0].toString();
    }else if(player_sum[0] < 21){
        console.log(player_state,player_sum[0],"/",player_sum[1]);
        player_text = player_sum[0].toString() + "/" + player_sum[1].toString();
    }else{
        console.log(player_state,player_sum[1]);
        player_text = player_sum[1].toString();
    }
    if(is_state_bust(player_state)){
        console.log("BUST");
    }
    console.log("dealer:");
    if(dealer_sum[0] === dealer_sum[1]){
        console.log(dealer_state,dealer_sum[0]);
        dealer_text = dealer_sum[0].toString();
    }else if(dealer_sum[0] < 21){
        console.log(dealer_state,dealer_sum[0],"/",dealer_sum[1]);
        dealer_text = dealer_sum[0].toString() + "/" + dealer_sum[1].toString();
    }else{
        console.log(dealer_state,dealer_sum[1]);
        dealer_text = dealer_sum[1].toString();
    }
    if(is_state_bust(dealer_state)){
        console.log("BUST");
    }
    return [player_text,dealer_text];
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const card_scale = 3;
const card_height = 726/card_scale;
const card_width = 500/card_scale;
function draw_state_of_play(){
    ctx.beginPath();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.stroke();
    let x = 0;
    let player_img = [];
    for(let i = 0;i < player_state.length;i++){
        player_img[i] = new Image();
        player_img[i].src = get_src_of_image_from_card(player_state[i]);
    }
    for(let i = 0;i < player_state.length;i++){
        player_img[i].onload = () => {
            ctx.drawImage(player_img[i],x,0,card_height,card_width);
            x+=50;
        };
    }
    let dealer_img = [];
    let y2 = 400,x2 = 0;
    for(let i = 0;i < dealer_state.length;i++){
        dealer_img[i] = new Image();
        dealer_img[i].src = get_src_of_image_from_card(dealer_state[i]);
    }
    for(let i = 0;i < dealer_state.length;i++){
        if(i === 1 && is_hide_dealer_card){
            //TODO: Add back of card here

        }else{
            dealer_img[i].onload = () => {
                ctx.drawImage(dealer_img[i],x2,y2,card_height,card_width);
                x2+=50;
            };
        }
    }
    let texts = get_text_from_cards();
    draw_label(texts[0],0,card_height);
    draw_label(texts[0],0,card_height);
    draw_label(texts[1],0,card_height+y2);
}

function get_sum_from_player_state(){
    return get_sum_form_state(player_state);
}
function get_sum_from_dealer_state(is_hide_dealer_card = true){
    return get_sum_form_state(dealer_state,is_hide_dealer_card);
}

function get_sum_form_state(state,dealer = false){
    let small_sum = 0;
    let big_sum = 0;
    let card;
    let offset = 0;
    if(dealer && state.length === 2){
        offset = 1;
    }
    for(let i = 0;i < state.length - offset;i++){
        card = state[i];
        card[card.length-1] = '';
        if(parseInt(card) === 1){
            small_sum += 1;
            big_sum += 11;
            continue;
        }
        if(parseInt(card) > 10){
            small_sum += 10;
            big_sum += 10;
        }else{
            small_sum += parseInt(card);
            big_sum += parseInt(card);
        }
    }
    return [big_sum,small_sum];
}

function get_new_card_from_deck(){
    let i = get_random_int(52);
    while (deck[i] === '0'){
        i = get_random_int(52);
    }
    return deck[i];
}

//TODO: Add bust (maybe function to check if state is bust)
function is_state_bust(state){
    let sums = get_sum_form_state(state);
    if(sums[0] > 21 && sums[1] > 21){
        return true;
    }
}

function draw_player_card(){
    let card = get_new_card_from_deck();
    deck = remove_from_deck(card);
    player_state.push(card);
    draw_state_of_play();
}

function draw_dealer_card(){
    let card = get_new_card_from_deck();
    deck = remove_from_deck(card);
    dealer_state.push(card);
}

function start_dealers_turn(){
    is_hide_dealer_card = false;
    while(get_sum_from_dealer_state(is_hide_dealer_card)[0] < 17){
        draw_dealer_card();
    }
    if(get_sum_from_dealer_state()[0] > 21){
        while(get_sum_from_dealer_state()[1] < 17){
            draw_dealer_card();
        }
    }
    draw_state_of_play();
}

function onload(){
}