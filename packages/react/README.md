Philosophy
==========
There are only two kinds of UI Elements to familiarize yourself with when using Civility:

**Components**
These never directly consume AppState or ServiceData, and extend from the Civility `Component` class. However, they can access data and methods passed from pages. If a component requires certain data to run, it should throw a warning so that the page can properly subscribe to that data.

**Pages**
These can consume AppState and ServiceData, and extend the Civility `Page` class. This allows us to subscribe to different aspects of AppState.

Think of these class extensions more like prop-injectors they shouldn't affect the render, just give additional lifecycle and dependency handling.


Usage
=====
```js
import React from "react"
import { Component, Page } from "@civility/react"
import { Comments, Router } from "@civility/store"

// This Example page would just be one comment thread (think Reddit).
class CommentThreadPage extends Page {
  // Inherit methods and data from these stores
  stores = [ Comments, Router ]

  constructor(props) {
    super(props)
  }

  render() {
    const { route, comments } = this.props

    return (
      <div className="comment-thread">
        <Comment root comment={comments[route.threadId]} />
        <Comment.ReplyBox open />
      </div>
    )
  }
}


class Comment extends Component {
  constructor(props, state) {
    super(props, state)
  }

  render() {
    const { content, root, user } = this.props.comment

    return (
      <div className={ root ? "root" : "reply"}>
        <Comment.Author author={user} />
        <Comment.Content content={content} />
        <Comment.Replies replies={replies} />
      </div>
    )
  }
}


Comment.Replies = class CommentReplies extends Component {
  constructor(props, state) {
    super(props, state)
  }

  render() {
    const replies = this.props.replies.map((comment, key) => {
      return <Comment comment={comment} key={key} />
    })

    return <div className="comment-replies">{replies}</div>
  }
}


Comment.ReplyBox = class CommentReplyBox extends Component {
  cache = "session" // Cache state changes in sessionStorage
  state = {}

  constructor(props, state) {
    super(props, state)
  }

  onChange = evt => this.setState({ text: evt.target.value })

  render() {
    const { open, action } = this.props

    /**
     * When our page subscribes to "comments", it gives Civility components
     * method access to actionsassociated with that Service Data. Some actions,
     * such as leaving comments, require other data, like UserData. The Comment
     * Store will be aware of dependencies such as this. However, unless you
     * specifically subscribe, you won't get explicit data or method access.
     */
    const submit = action.postComment.bind(this)

    return (
      <form className={classNames("comment-reply-box", { open })} submit={submit}>
        <textarea onChange={this.onChange} />
        <button />
      </form>
    )
  }
}
```


Styles
======
Default styles are imported via `@civility/stylesheets`. You can also opt-out of these, but they give a lot of the base styles for components.

The main philosophy for styles is two-fold:
 - A user should be able to theme components via a single imported css stylesheet.
 - A user should always be able to override any default style with 1 custom CSS class.

All UI Elements have a few ways of being styled:
- **You can pass in your own styles, classNames, and ids to any component**. These will be applied to the root component that you are using. This is useful for overriding styles on an individual component instance, and is also useful for creating custom component wrappers.
- **All Components and Pages have built-in classNames** in kebab-case( e.g. `Comment.ReplyBox => comment-reply-box`). There are no styles associated with these classes, and are meant to be used as hooks. This way, it is easy to override an entire class of components at once.
- **All Styled Components and Pages inherit overridable styles from our custom extension of [BassCSS](http://basscss.com/)**. This way, you should be able to override all components to make a theme with a single css file, imported after `@civility/stylesheets`. The classNames created by Civility can look unwieldy, but if you don't want to learn how basscss is used, you don't need to; you can override via the other methods mentioned with a single css class imported after `@civility/stylesheets`.
