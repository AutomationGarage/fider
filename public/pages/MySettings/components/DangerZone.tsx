import React from "react";

import { Button, Modal, ButtonClickEvent } from "@fider/components";
import { actions, notify, navigator } from "@fider/services";

interface DangerZoneState {
  clicked: boolean;
}

export class DangerZone extends React.Component<{}, DangerZoneState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      clicked: false
    };
  }

  public onClickDelete = async () => {
    this.setState({ clicked: true });
  };

  public onCancel = async () => {
    this.setState({ clicked: false });
  };

  public onConfirm = async (e: ButtonClickEvent) => {
    const response = await actions.deleteCurrentAccount();
    if (response.ok) {
      e.preventEnable();
      navigator.goHome();
    } else {
      notify.error("Не удалось удалить ваш аккаунт. Пожалуйста, попробуйте ещё раз");
    }
  };

  public render() {
    return (
      <div className="l-danger-zone">
        <Modal.Window isOpen={this.state.clicked} center={false} onClose={this.onCancel}>
          <Modal.Header>Удалить аккаунт</Modal.Header>
          <Modal.Content>
            <p>
              Если вы удалите ваш аккаунт, мы удалим всю вашу персональную информацию навсегда. 
              Опубликованный вами контент останется, но будет анонимизирован.
            </p>
            <p>
              Этот действие необратимо. <strong>Вы абсолютно уверены?</strong>
            </p>
          </Modal.Content>
          <Modal.Footer>
            <Button color="danger" size="tiny" onClick={this.onConfirm}>
              Подтвердить
            </Button>
            <Button color="cancel" size="tiny" onClick={this.onCancel}>
              Отменить
            </Button>
          </Modal.Footer>
        </Modal.Window>

        <h4>Удалить аккаунт</h4>
        <p className="info">
          Если вы удалите ваш аккаунт, мы удалим всю вашу персональную информацию навсегда.
          Опубликованный вами контент останется, но будет анонимизирован.
        </p>
        <p className="info">Этот действие необратимо. Продолжайте только если вы абсолютно уверены.</p>
        <Button color="danger" size="tiny" onClick={this.onClickDelete}>
          Удалить мой аккаунт
        </Button>
      </div>
    );
  }
}
