import axios from 'axios';
import Failure from '~/lib/failure';

const DOMAIN = 'https://api.convertkit.com/v3/';

export type ConvertKitCredentials = {
  apiKey: string;
  apiSecret: string;
};

export type Subscriber = {
  name: string;
  email: string;
};

export type AddSubscriberResult = {
  id: number;
  state: string;
  created_at: string;
  source: string;
  referrer: string;
  subscribable_id: number;
  subscribable_type: string;
  subscriber: {
    id: number;
  };
};

export type ConvertKitTag = {
  id: number;
  name: string;
  createdAt: string;
};

export class ConvertKit {
  private apiKey: ConvertKitCredentials['apiKey'];
  private apiSecret: ConvertKitCredentials['apiSecret'];

  constructor({ apiKey, apiSecret }: ConvertKitCredentials) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

  async addSubscriber(subscriber: Subscriber, tagId: string) {
    const result = await axios.post(`${DOMAIN}/tags/${tagId}/subscribe`, {
      // We only need to apply the API secret.
      api_secret: this.apiSecret,
      email: subscriber.email,
      first_name: subscriber.name,
    });

    return result.data.subscription as AddSubscriberResult;
  }

  async getTag(tagName: string) {
    try {
      const result = await axios.post(`${DOMAIN}/tags`);
      const tags = result.data.tags.map(
        (tag: any) => ({ id: tag.id, createdAt: tag.created_at, name: tag.name } as ConvertKitTag),
      ) as ConvertKitTag[];

      return tags.find((c) => c.name === tagName);
    } catch (e) {
      throw new Failure('internal_error', `Failed to load tag with the name: ${tagName}`);
    }
  }
}
