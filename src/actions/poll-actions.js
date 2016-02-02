import * as types from './action-types';
import {addOwnPollID, deleteOwnPollID} from './user-actions';
import {clearPollForm} from './poll-form-actions';

import formatUrl from '../utils/format-url';

export const addPoll = (payload) => ({
  type: types.ADD_POLL,
  payload
});

export const postAddPoll = (history) => (
  (dispatch, getState) => {
    let {polls, authedUser, pollForm} = getState()
      , pollID = polls.length > 0 ? polls[polls.length-1].id + 1 : 1;

    let payload = {
      id: pollID,
      submitter: authedUser.username,
      name: pollForm.name.trim(),
      options: pollForm.options.reduce((x, y) => {
        if (y) {
          return {
            ...x,
            [y.trim()]: 0
          }
        }
        return x;
      }, {}),
      selectedOption: 'select'
    }
    // server access
      // on success
      dispatch(addPoll(payload));
      dispatch(addOwnPollID(authedUser.username, pollID));
      dispatch(clearPollForm());
      Materialize.toast(
        'Poll succesfully created! Redirecting...',
        1000, '',
        () => history.push(`/polls/${formatUrl(payload.name, true)}`)
      );
  }
);

export const editPoll = (pollID, payload) => ({
  type: types.EDIT_POLL,
  pollID,
  payload
});

export const postEditPoll = (pollID, payload) => (
  (dispatch, getState) => {
    const {authedUser} = getState();
    // server access
      dispatch(editPoll(pollID, payload));
  }
);

export const deletePoll = (pollID) => ({
  type: types.DELETE_POLL,
  pollID
});

export const postDeletePoll = (pollID) => (
  (dispatch, getState) => {
    const {authedUser} = getState();
    // server access
      dispatch(deletePoll(pollID));
      dispatch(deleteOwnPollID(authedUser.username, pollID));
  }
);

export const voteOnPoll = (pollID, option) => ({
  type: types.VOTE_ON_POLL,
  pollID,
  option
});

export const postVoteOnPoll = (pollID, option) => (
  (dispatch, getState) => {
    const {authedUser} = getState();
    // server access
      dispatch(voteOnPoll(pollID, option));
  }
);

export const changeSelectedOption = (pollID, option) => ({
  type: types.CHANGE_SELECTED_OPTION,
  pollID,
  option
})
