import React from "react";

import { UserSettings } from "@fider/models";
import { Toggle, Segment, Segments, Field } from "@fider/components";
import { Fider } from "@fider/services";

interface NotificationSettingsProps {
  userSettings: UserSettings;
  settingsChanged: (settings: UserSettings) => void;
}

interface NotificationSettingsState {
  userSettings: UserSettings;
}

type Channel = number;
const WebChannel: Channel = 1;
const EmailChannel: Channel = 2;

export class NotificationSettings extends React.Component<NotificationSettingsProps, NotificationSettingsState> {
  constructor(props: NotificationSettingsProps) {
    super(props);

    this.state = {
      userSettings: this.props.userSettings
    };
  }

  private isEnabled(settingsKey: string, channel: Channel): boolean {
    if (settingsKey in this.state.userSettings) {
      return (parseInt(this.state.userSettings[settingsKey], 10) & channel) > 0;
    }
    return false;
  }

  private async toggle(settingsKey: string, channel: Channel) {
    const userSettings = { ...this.state.userSettings };
    userSettings[settingsKey] = (parseInt(this.state.userSettings[settingsKey], 10) ^ channel).toString();

    this.setState({ userSettings });
    this.props.settingsChanged(userSettings);
  }

  private icon(settingsKey: string, channel: Channel) {
    const active = this.isEnabled(settingsKey, channel);
    const label = channel === WebChannel ? "На странице уведомлений" : "По еmail";
    return (
      <Toggle
        key={`${settingsKey}_${channel}`}
        active={active}
        label={label}
        onToggle={this.toggle.bind(this, settingsKey, channel)}
      />
    );
  }

  private info(settingsKey: string, aboutForVisitors: string, aboutForCollaborators: string) {
    const about = Fider.session.user.isCollaborator ? aboutForCollaborators : aboutForVisitors;
    const webEnabled = this.isEnabled(settingsKey, WebChannel);
    const emailEnabled = this.isEnabled(settingsKey, EmailChannel);

    if (!webEnabled && !emailEnabled) {
      return (
        <p className="info">
          Вы <strong>не будете</strong> видеть или получать уведомлений о {about}.
        </p>
      );
    } else if (webEnabled && !emailEnabled) {
      return (
        <p className="info">
          Вы будете видеть уведомления о {about} <strong>на странице уведомлений</strong>.
        </p>
      );
    } else if (!webEnabled && emailEnabled) {
      return (
        <p className="info">
          Вы будете получать уведомления о {about} <strong>по email</strong>.
        </p>
      );
    } else if (webEnabled && emailEnabled) {
      return (
        <p className="info">
          Вы будете видеть уведомления о {about} <strong>на странице уведомлений</strong> и получать их <strong>по email</strong>.
        </p>
      );
    }
    return null;
  }

  public render() {
    return (
      <>
        <Field label="Уведомления">
          <p className="info">Выберите как вы хотите получать уведомления</p>
        </Field>

        <div className="notifications-settings">
          <Segments>
            <Segment>
              <span className="event-title">Новые отзывы</span>
              {this.info("event_notification_new_post", "новых отзывах на этом сайте", "новых отзывах на этом сайте")}
              <p>
                {this.icon("event_notification_new_post", WebChannel)}
                {this.icon("event_notification_new_post", EmailChannel)}
              </p>
            </Segment>
            <Segment>
              <span className="event-title">Обсуждения</span>
              {this.info(
                "event_notification_new_comment",
                "комментариях к отзывам, на которые вы подписались",
                "comments on all posts unless individually unsubscribed"
              )}
              <p>
                {this.icon("event_notification_new_comment", WebChannel)}
                {this.icon("event_notification_new_comment", EmailChannel)}
              </p>
            </Segment>
            <Segment>
              <span className="event-title">Смена статуса отзыва</span>
              {this.info(
                "event_notification_change_status",
                "смене статуса отзывов, на которые вы подписались",
                "status change on all posts unless individually unsubscribed"
              )}
              <p>
                {this.icon("event_notification_change_status", WebChannel)}
                {this.icon("event_notification_change_status", EmailChannel)}
              </p>
            </Segment>
          </Segments>
        </div>
      </>
    );
  }
}
