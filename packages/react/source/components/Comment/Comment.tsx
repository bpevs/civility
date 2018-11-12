import React from "react"
import { Author } from "./partials/Author"
import { Content } from "./partials/Content"
import { Replies } from "./partials/Replies"
import { ReplyBox } from "./partials/ReplyBox"


export interface CommentProps extends React.HTMLProps<HTMLElement> {
  comment: string
  user: object
  root: boolean
  replies: object
}

export class Comment extends React.Component<CommentProps> {
  public Author = Author
  public Content = Content
  public Replies = Replies
  public ReplyBox = ReplyBox

  constructor(props, state) {
    super(props, state)
  }

  public render() {
    const { content, replies, root, user } = this.props.comment

    return (
      <div className={ root ? "root" : "reply"}>
        <Comment.Author author={user} />
        <Comment.Content content={content} />
        <Comment.Replies replies={replies} />
      </div>
    )
  }
}
