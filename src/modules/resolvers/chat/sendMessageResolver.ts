import {documentStore} from "../../../constants";
import {Chat} from "../../../entity/chat/chat";
import {User} from "../../../entity/user/User";
import {Message} from "../../../entity/chat/message";

export async function sendMessageResolver(args, pubsub) {
    const user = await User.findUserByID(args.userId);

    const session = documentStore.openSession();
    const chat: Chat = await session.load(args.chatId);
    const message = new Message(user, args.content, new Date())

    chat.history.length === 0 ? chat.history = [message] : chat.history.push(message);

    await session.saveChanges();
    if (pubsub) {
        await pubsub.publish(user.id, {newMessage: message});
    }
    return chat;
}