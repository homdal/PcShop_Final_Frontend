const createOrder = (cart, inputs, deliveryOption, total) => {
  let items = [];
  for (let item of cart) {
    items.push({
      productId: item.product._id,
      name: item.product.name,
      quantity: item.amount,
      pricePer: item.product.price,
      priceCol: item.product.price * item.amount,
    });
  }
  let order = {
    customer: {
      contactInfo: {
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        phone: inputs.phone,
        email: inputs.email,
      },
      address: {
        country: inputs.country,
        city: inputs.city,
        street: inputs.street,
        houseNumber: inputs.houseNumber,
        zip: inputs.zip,
      },
    },
    total: total,
    items: items,
    deliveryOption: deliveryOption,
  };
  return order;
};
export default createOrder;
