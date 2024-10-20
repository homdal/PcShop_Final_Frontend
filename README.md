This is the react frontend of my final project and requires the Final_Backend to function.
All instructions can be found on the About page of the project.

The project function as a computer shop website.
 
 ### Navigation
 - You can navigate through the website by using the side menu,
                which opens after pressing the categories button in the header
                or by using the links in the footer.
                
- The links in the side menu change depending on the user type,
                employees and admin users get additional links such as "add
                product", "all products", "all orders" and "register employee".
  
- The search in the header can be used to search for products by
                either name or tags, for example inputing "gaming" and clicking
                the magnifying glass button will search for all products that
                have the word "gaming" in their name or tags.
  
### Products
   - Each product leads to it's own page with the 'view' button found
                at the bottom of each product card. On the product page you can
                view the product details and then add it to your cart in the
                chosen quantity.
     
 - On the cart page you can view the items you have added to your
                cart as well as change their quantities or remove them entirely.
                The checkout button will cause a popup to appear if the user is
                not logged in, asking if the user wishes to checkout as a guest
                or log into their account. This popup does not appear if the
                user is already logged in.
   
- On the checkout page the user will need to fill out the payment
                details, choose a delivery method and finalize the purchase to
                place the order. An order number will be provided if done
                successfully.

### Users
   - The user can log in and register on the log in page, users
                registered this way will always be customer type. The user can
                choose to upload a profile image if they wish.
     
  - All users can access their account page to view their details as
                well as orders they have placed.
    
  - Employee users can:
    + Add products to the database using the "add product" page.
                    Each product requires an image to be uploaded.
                          Add products to the database using the "add product" page.
    + View and edit all products on the "all products" page.
                    Changing the product image is optional when editing.
    + View all orders on the "all orders" page where they can also
                    edit the order status.
    +  Admin users can register new employee users using the "register
                employee" page.

  ### Orders
  -  Anyone can look up a placed order by using the order number
                given at the end of the purchase proccess on the "find order"
                page.
     
  - To place an order the user must add at least one item to the
                cart and proceed through the checkout process, which can be done
                by either guest or logging into an account.
