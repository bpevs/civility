import react from "React"

export class ReplyBox extends React.Component {
  public cache = "session" // Cache state changes in sessionStorage
  public state = {}

  constructor(props, state) {
    super(props, state)
  }

  public onChange = evt => this.setState({ text: evt.target.value })

  public render() {
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
