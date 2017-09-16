from flask import Flask, request
import json

app = Flask(__name__)

CART_STATUS_READY, CART_STATUS_ORDERING = range(2)

class User:
    def __init__(self, name, id):
        self.name = name
        self.id = id
        self.cart = Cart(id, CART_STATUS_READY, [], 0) 

    def add_item(item):
        self.cart.add_item(item)

    def remove_item(item):
        self.cart.remove_item(item)

class Cart:
    def __init__(self, id, status, items, subtotal):
        self.status = status
        self.id = id
        self.items = items
        self.subtotal = subtotal

    def add_item(item):
        items.append(item)
        subtotal += item.price

    def remove_item(item):
        items.remove(item)
        subtotal -= item.price

    def update_cart(status):
        self.status = status 

class Item:
    def __init__(self, name, price, id):
        self.name = name
        self.price = price
        self.id = id

clarence = User("Clarence", 1)
joseph = User("Joseph", 2)
bryan = User("Bryan", 3)
tanwei = User("Tan Wei", 4)

ham_cheese = Item("Ham & Cheese", 3.50, 1)
ham_turkey_cheese = Item("Ham, Turkey & Cheese", 4.00, 2)
turkey_cheese = Item("Turkey & Cheese", 3.50, 3)
roast_beef_cheese = Item("Roast Beef & Cheese Croissant", 4.50, 4)

items = [ham_cheese, ham_turkey_cheese, turkey_cheese, roast_beef_cheese]
users = [clarence, joseph, bryan, tanwei]

@app.route('/api/update_items', methods=["POST"])
def add_item():
    data = request.data
    userId = "userId"
    qty = "qty"
    itemId = "itemId"

    # if any params not found
    if not is_valid_params(data, (userId, qty, itemId)): 
        return respond(status.HTTP_404_NOT_FOUND)

    user = find_user_by_id(int(data[userId]))
    item = find_item_by_id(int(data[itemId]))

    qty_int = int(data[qty])
    if qty_int > 0:
        for _ in range(qty_int):
            user.add_item(item)
    elif qty_int < 0:
        for _ in range(-qty_int):
            user.remove_item(item)

    return respond(status.HTTP_200_OK)

@app.route('/api/carts/', methods=["GET"])
def carts():
    return json.dumps([user.cart for user in users], default=lambda o: o.__dict__), status.HTTP_200_OK

@app.route('/api/update_status', methods=["POST"])
def update_status():
    data = request.data
    userId = "userId"
    status = "status"

    if not is_valid_params(data, (userId, status)):
        return respond(status.HTTP_404_NOT_FOUND)

    user = find_user_by_id(int(data[userId]))

    if int(status) not in range(2):
        return respond(status.HTTP_404_NOT_FOUND)

    user.cart.update_status(int(status))

    return respond(status.HTTP_200_OK)

def is_valid_params(params, check):
    return not any([param for param in params if param not in check]) 

def find_user_by_id(id):
    return next(user for user in users if user.id == id) 

def find_item_by_id(id):
    return next(item for item in items if item.id == id)

def respond(code): 
    return dict(), code

if __name__ == '__main__':
    app.run(debug=True)
