import FormControl from "@/app/_components/FormControl";
import SubmitButton from "@/app/_components/SubmitButton";
import { updateOrder } from "@/app/_lib/actions";
import { getOrderById } from "@/app/_services/order-api";

async function page({ params }) {
  const { orderId } = params;
  const order = await getOrderById(orderId);
  return (
    <div>
      <form className="flex flex-col gap-4 pb-4" action={updateOrder}>
        <input type="hidden" value={orderId} name="orderId" />
        <FormControl label="Phone number" id="phone" variation="col">
          <input
            type="tel"
            name="phone"
            id="phone"
            className="input"
            defaultValue={order.data.doc?.phone}
          />
        </FormControl>
        <div className="grid grid-cols-2 gap-4">
          <FormControl label="Street" id="street" variation="col">
            <input
              type="text"
              name="street"
              id="street"
              className="input"
              defaultValue={order.data.doc?.address.street}
            />
          </FormControl>
          <FormControl label="Postal Code" id="postal-code" variation="col">
            <input
              type="text"
              name="postalCode"
              id="postal-code"
              className="input"
              defaultValue={order.data.doc?.address.postalCode}
            />
          </FormControl>
        </div>
        <FormControl
          label="Address description"
          id="address-text"
          variation="col"
        >
          <textarea
            name="addressText"
            id="address-text"
            className="input resize-none h-36"
            defaultValue={order.data.doc.address.text}
          />
        </FormControl>
        <FormControl label="Text" id="text" variation="col">
          <textarea
            name="text"
            id="text"
            className="input resize-none h-36"
            defaultValue={order.data.doc.text}
          />
        </FormControl>
        <div className="flex justify-end">
          <SubmitButton pendingLabel="Updating...">Update Order</SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default page;
