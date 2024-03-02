const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
let deck = create_decK_of_playing_cards();

function get_random_int(from){
    return Math.floor(Math.random()*from);
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

function start_deal(){
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
    print_state_of_play();
}

function print_state_of_play(){
    //
    //placeholder before coding the graphics
    //
    console.log("player:");
    console.log(player_state,get_sum_from_player_state());
    console.log("dealer:");
    console.log(dealer_state,get_sum_from_dealer_state());
}

function get_sum_from_player_state(){
    return get_sum_form_state(player_state);
}
function get_sum_from_dealer_state(){
    return get_sum_form_state(dealer_state);
}

function get_sum_form_state(state){
    let small_sum = 0;
    let big_sum = 0;
    let card;
    for(let i = 0;i < state.length;i++){
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

function draw_player_card(){
    let card = get_new_card_from_deck();
    deck = remove_from_deck(card);
    player_state.push(card);
    print_state_of_play();
}

function draw_dealer_card(){
    let card = get_new_card_from_deck();
    deck = remove_from_deck(card);
    dealer_state.push(card);
}

function start_dealers_turn(){
    //TODO: if dealer has ace and he is bust check if both big_sum and small_bum are less than 17 since he could still be able to draw cards
    while(get_sum_from_dealer_state()[0] < 17){
        draw_dealer_card();
    }
    print_state_of_play();
}

function onload(){
    let img = new Image();
    img.onload = () => {
        ctx.drawImage(img,0,0,200,200);
    };
    img.src = "Playing_Cards/Playing_Cards/PNG-cards-1.3/2_of_clubs.png";
}