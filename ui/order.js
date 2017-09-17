var msLeft = 942000;
var items = {
    1: {
        name: "Big Sur Slice",
        price: "5.40"
    },
    2: {
        name: "Combo Slice",
        price: "5.80"
    },
    3: {
        name: "Sausage Slice",
        price: "4.80"
    },
    4: {
        name: "Little Sur Slice",
        price: "5.20"
    }
};

var cart = {};
var numMembers = 3;
var members = {
    1: {
        name: "Clarence",
        amount: 25.50
    }
}


var menuEntry = ' <div class="entry" data-itemId="{3}"> <div class="name">{0}</div> <div class="price">{1}</div> <div class="quantity">{2} </div> </div>';
function addToCart(itemId) {
    console.log(itemId);
    var query = window.location.search.substring(1); var qs = parse_query_string(query);

    var userId = qs.userId ? qs.userId : 1;
    var item = items[itemId];

    if(!cart[itemId]) {
        cart[itemId] = {
            itemId: itemId,
            quantity: 1
        }
    } else {
        cart[itemId].quantity = +cart[itemId].quantity + 1;
    }
    console.log(cart);
    $("#cart [data-itemId=" + itemId + "]").remove();
    $("#cart").append(menuEntry.format(item.name, item.price, "x" +cart[itemId].quantity, itemId));

    refreshTotals();
}

function refreshTotals() {
    var subtotal = 0, 
        taxes = 0,
        discount = 0,
        delivery = 0,
        total = 0;
    for (var itemId in cart) {
        subtotal += cart[itemId].quantity * items[itemId].price;
    }
    taxes = 0.09 * subtotal;
    discount = 0.08 * (subtotal);
    delivery = 5 / numMembers;
    total = subtotal + taxes + delivery - discount;

    $("#subtotal").html(formatMoney(subtotal));
    $("#taxes").html(formatMoney(taxes));
    $("#delivery").html(formatMoney(delivery));
    $("#discount").html("-" + formatMoney(discount));
    $("#total").html(formatMoney(total));
    refreshBar(total);
}
var othersTotal = 140;
function refreshBar(myTotal) {
    var maxBarWidth = 340;
    var maxValue = 200;
    var myWidth = (othersTotal + myTotal) / maxValue  * maxBarWidth;
    var othersWidth = (othersTotal) / maxValue  * maxBarWidth;

    $("#total-progress").animate({
        width: Math.min(othersWidth, maxBarWidth) + "px"
    }, 500)
    $("#my-progress").animate({
        width: Math.min(myWidth, maxBarWidth) + "px"
    }, 500)
}
function formatMoney(float) {
    return "$" + float.toFixed(2);
}

function addMember(memberId) {
    var memberHtml = ' <div class="member" style="background-color: yellow"><div class="image"></div> <div class="name">{0}</div> </div>';
    othersTotal += members[memberId].amount;
    var newMember = $("#members").append(memberHtml.format("Clarence"));
    numMembers += 1;
    $(".member").animate({
        backgroundColor: "white"
    }, 1200);
    refreshTotals();
}

function updateTimer() {
    $("#timer").show();
    var days = Math.floor(msLeft / (1000 * 60 * 60 * 24));
    var hours = Math.floor((msLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((msLeft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((msLeft % (1000 * 60)) / 1000);
    if(seconds < 10) seconds = "0" + seconds;
    if(minutes < 10) minutes = "0" + minutes;
    var displayString = hours  + " : " + minutes + " : " + seconds;
    $("#timer").html(displayString);
    msLeft -= 1000;
}
updateTimer();
setInterval(updateTimer, 1000);
setTimeout(function() {
    addMember(1);
}, 8000)

function parse_query_string(query) {
  var vars = query.split("&"); var query_string = {}; for (var i = 0; i < vars.length; i++) { var pair = vars[i].split("="); if (typeof query_string[pair[0]] === "undefined") { query_string[pair[0]] = decodeURIComponent(pair[1]); } else if (typeof query_string[pair[0]] === "string") { var arr = [query_string[pair[0]], decodeURIComponent(pair[1])]; query_string[pair[0]] = arr; } else { query_string[pair[0]].push(decodeURIComponent(pair[1])); } } return query_string;
}
if (!String.prototype.format) { String.prototype.format = function() { var args = arguments; return this.replace(/{(\d+)}/g, function(match, number) { return typeof args[number] != 'undefined' ? args[number] : match ; }); }; }


