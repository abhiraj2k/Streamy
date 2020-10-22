import React from "react";
import { fetchStream } from "../../actions";
import { connect } from "react-redux";
import StreamForm from "./StreamForm";
import { editStream } from "../../actions";

class StreamEdit extends React.Component {
  componentDidMount = () => {
    this.props.fetchStream(this.props.match.params.id);
  };
  onSubmit = (formValues) => {
    const id = this.props.match.params.id;
    this.props.editStream(id, formValues);
  };
  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    } else {
      if (this.props.currentUserId === this.props.stream.userId) {
        return (
          <div>
            <h3>Edit Stream</h3>
            <StreamForm
              onSubmit={this.onSubmit}
              initialValues={{
                title: this.props.stream.title,
                description: this.props.stream.description,
              }}
            />
          </div>
        );
      }
      return <div>Please Log In first</div>;
    }
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
    currentUserId: state.auth.userId,
  };
};
export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
