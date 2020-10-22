import React from "react";
import Modal from "../Modal";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import history from "../../history";
import { fetchStream, deleteStream } from "../../actions";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
  handleDelete = () => {
    this.props.deleteStream(this.props.match.params.id);
  };
  renderActions = () => {
    return (
      <>
        <button className="ui button negative" onClick={this.handleDelete}>
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </>
    );
  };
  renderContent() {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream?";
    }
    if (this.props.stream) {
      return `Are you sure you want to delete: ${this.props.stream.title}?`;
    }
  }
  render() {
    return (
      <Modal
        title={"Delete Stream"}
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};
export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
