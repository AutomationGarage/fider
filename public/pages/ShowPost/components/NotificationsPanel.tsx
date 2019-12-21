import React from "react";
import { Post } from "@fider/models";
import { Button, List, ListItem } from "@fider/components";
import { actions, Fider } from "@fider/services";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

interface NotificationsPanelProps {
  post: Post;
  subscribed: boolean;
}

interface NotificationsPanelState {
  subscribed: boolean;
}

export class NotificationsPanel extends React.Component<NotificationsPanelProps, NotificationsPanelState> {
  constructor(props: NotificationsPanelProps) {
    super(props);
    this.state = {
      subscribed: this.props.subscribed
    };
  }

  private subscribeOrUnsubscribe = async () => {
    const action = this.state.subscribed ? actions.unsubscribe : actions.subscribe;

    const response = await action(this.props.post.number);
    if (response.ok) {
      this.setState(state => ({
        subscribed: !state.subscribed
      }));
    }
  };

  public render() {
    if (!Fider.session.isAuthenticated) {
      return null;
    }

    const button = this.state.subscribed ? (
      <Button fluid={true} onClick={this.subscribeOrUnsubscribe}>
        <FaVolumeMute /> Отписаться
      </Button>
    ) : (
      <Button fluid={true} onClick={this.subscribeOrUnsubscribe}>
        <FaVolumeUp /> Подписаться
      </Button>
    );

    const text = this.state.subscribed ? (
      <span className="info">Вы получаете уведомления об активности этого отзыва.</span>
    ) : (
      <span className="info">Вы не будете получать уведомлений об этом отзыве.</span>
    );

    return (
      <>
        <span className="subtitle">Уведомления</span>
        <List>
          <ListItem>
            {button}
            {text}
          </ListItem>
        </List>
      </>
    );
  }
}
