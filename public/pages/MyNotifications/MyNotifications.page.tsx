import "./MyNotifications.page.scss";

import React from "react";

import { Notification } from "@fider/models";
import { MultiLineText, Moment, Heading, List, ListItem } from "@fider/components";
import { actions } from "@fider/services";
import { FaBell } from "react-icons/fa";

interface MyNotificationsPageProps {
  notifications: Notification[];
}

interface MyNotificationsPageState {
  unread: Notification[];
  recent: Notification[];
}

export default class MyNotificationsPage extends React.Component<MyNotificationsPageProps, MyNotificationsPageState> {
  constructor(props: MyNotificationsPageProps) {
    super(props);

    const [unread, recent] = (this.props.notifications || []).reduce(
      (result, item) => {
        result[item.read ? 1 : 0].push(item);
        return result;
      },
      [[] as Notification[], [] as Notification[]]
    );

    this.state = {
      unread,
      recent
    };
  }

  private items(notifications: Notification[]): JSX.Element[] {
    return notifications.map(n => {
      return (
        <ListItem key={n.id}>
          <a href={`/notifications/${n.id}`}>
            <MultiLineText text={n.title} style="simple" />
            <span className="info">
              <Moment date={n.createdAt} />
            </span>
          </a>
        </ListItem>
      );
    });
  }

  private markAllAsRead = async () => {
    const response = await actions.markAllAsRead();
    if (response.ok) {
      location.reload();
    }
  };

  public render() {
    return (
      <div id="p-my-notifications" className="page container">
        <Heading title="Уведомления" subtitle="Будьте в курсе происходящего" icon={FaBell} />

        <h4>
          Новые
          {this.state.unread.length > 0 && (
            <span className="mark-as-read" onClick={this.markAllAsRead}>
              Пометить все как "Прочитанные"
            </span>
          )}
        </h4>
        <List>
          {this.state.unread.length > 0 && this.items(this.state.unread)}
          {this.state.unread.length === 0 && <span className="info">Нет новых уведомлений.</span>}
        </List>
        {this.state.recent.length > 0 && (
          <>
            <h4>Прочитанные (За последние 30 дней)</h4>
            <List>
              <ListItem>{this.items(this.state.recent)}</ListItem>
            </List>
          </>
        )}
      </div>
    );
  }
}
