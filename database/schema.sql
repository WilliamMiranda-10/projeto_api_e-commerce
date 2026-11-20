CREATE TABLE users( 
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    surname TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

 CREATE TABLE products(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    price_in_cents INTEGER NOT NULL CHECK (price_in_cents > 0),
    amount INTEGER NOT NULL CHECK (amount > 0 )
 );


 CREATE TABLE purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    purchases_date DATE NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id),
    delivery_address TEXT NOT NULL
 );

CREATE TABLE purchasesproducts(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    purchases_id UUID NOT NULL REFERENCES purchases(id),
    products_id UUID NOT NULL REFERENCES products(id),
    product_amount INTEGER NOT NULL CHECK (product_amount > 0)
);
