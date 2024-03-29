import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import styles from "./styles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import NotificationImportant from "@material-ui/icons/NotificationImportant";

class ChatListComponent extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  newChat = () => {
    console.log("new chat clicked");
  };

  selectChat(index) {
    this.props.selectChatFn(index);
  }

  userIsSender = chat => {
    return (
      chat.messages[chat.messages.length - 1].sender === this.props.userEmail
    );
  };

  render() {
    const { classes } = this.props;
    if (this.props.chats.length > 0) {
      return (
        <main className={classes.root}>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            className={classes.newChatBtn}
            onClick={this.newChat}
          >
            New message
          </Button>
          <List>
            {this.props.chats.map((_chat, _index) => {
              return (
                <div key={_index}>
                  <ListItem
                    onClick={() => this.selectChat(_index)}
                    className={classes.listItem}
                    selected={this.props.selectedChatIndex === _index}
                    alignItems="flex-start"
                  >
                    <ListItemAvatar>
                      <Avatar>
                        {_chat.users
                          //filter returns an array of users that aren't me
                          //the list should contain only one item so we then do [0]
                          .filter(_user => _user !== this.props.userEmail)[0]
                          .charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        _chat.users.filter(
                          _user => _user !== this.props.userEmail
                        )[0]
                      }
                      secondary={
                        <React.Fragment>
                          <Typography component="span" color="textPrimary">
                            {_chat.messages[
                              _chat.messages.length - 1
                            ].message.substring(0, 27)}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                    {_chat.receiverHasRead === false &&
                    !this.userIsSender(_chat) ? (
                      <ListItemIcon>
                        <NotificationImportant
                          className={classes.unreadMessage}
                        />
                      </ListItemIcon>
                    ) : null}
                  </ListItem>
                  <Divider />
                </div>
              );
            })}
          </List>
        </main>
      );
    } else {
      return (
        <main className={classes.root}>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={this.newChat}
            className={classes.newChatBtn}
          >
            New message
          </Button>
          <List />
        </main>
      );
    }
  }
}

export default withStyles(styles)(ChatListComponent);
