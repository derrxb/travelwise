import Failure from '~/lib/failure';
import subscribeToNewsletterSchema from '~/presentation/requests/subscribe-to-newsletter';
import type { Subscriber } from '../mappers/convert-kit-mapper';
import { ConvertKit } from '../mappers/convert-kit-mapper';

export class SubscribeToNewsletter {
  private request: Request;
  private subscriber: Subscriber | null;
  private convertKit: ConvertKit;
  private TAG = 'newsletter';

  constructor(request: Request) {
    this.request = request;
    this.subscriber = null;
    this.convertKit = new ConvertKit({
      apiKey: process.env.CONVERT_KIT_API_KEY as string,
      apiSecret: process.env.CONVERT_KIT_API_SECRET as string,
    });
  }

  async verifyParams() {
    const requestText = await this.request.text();
    const form = new URLSearchParams(requestText);
    const validatedParams = await subscribeToNewsletterSchema.validateAsync({
      firstName: form.get('firstName'),
      email: form.get('email'),
    });
    this.subscriber = { ...validatedParams };
  }

  async getNewsletterTagId() {
    return await this.convertKit.getTag(this.TAG);
  }

  async subscribeUser(tagId: string) {
    if (this.subscriber) {
      this.convertKit.addSubscriber(this.subscriber, tagId);
    } else {
      throw new Failure('bad_request', 'You need to provide a user `firstName` and `email` to subscribe.');
    }
  }

  async call() {
    await this.verifyParams();
    const tagId = await this.getNewsletterTagId();

    if (tagId) {
      this.subscribeUser(tagId.id.toString());
    }
  }
}
