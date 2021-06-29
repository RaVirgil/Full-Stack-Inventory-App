import { EntityManager, } from "mikro-orm";
import { Order } from "../entities/order.entity";

export {  
  getOrdersForUser,  
  postOrder,  
};

async function getOrdersForUser(
  em: EntityManager,
  id: string
): Promise<Error | Order[] | null> {
  if (!(em instanceof EntityManager)) return Error("invalid request");

  if (!id || typeof id !== "string") return Error("invalid params");

  try {
    const items = await em.find(Order, { userId: id });
    return items;
  } catch (ex) {
    return ex;
  }
}

async function postOrder(
  em: EntityManager,
  order: Partial<Order>
): Promise<Error | Order> {
  if (!(em instanceof EntityManager)) return Error("invalid request");

  if (!order || typeof order !== "object" || order.id)
    return Error("invalid params");

  try {
    const item = new Order(order);
    item.orderedAt = new Date();
    item.status = "placed";
    await em.persistAndFlush(item);
    return item;
  } catch (ex) {
    return ex;
  }
}
