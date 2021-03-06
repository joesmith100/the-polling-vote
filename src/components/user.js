import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import formatUrl from '../utils/format-url';
import {
  postDeletePoll,
  postAddPoll,
  postEditPoll} from '../actions/poll-actions';
import {
  changePollFormOptions,
  changePollFormName,
  changePollFormType,
  insertPollForm,
  clearPollForm} from '../actions/poll-form-actions';

export default ({
  users,
  polls,
  params,
  dispatch,
  pollForm,
  baseColor,
  authedUser
}) => {
  let user = users.find(x => x.username === params.user);
  if (user) {
    return <div className='container'>
      <div className='row'>
        <div className='col s12 m8 offset-m2'>
          <div className='center'>
            <h1 className='center'>{params.user}</h1>
          </div>
          {pollForm.formType === 'Edit' &&
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(changePollFormType('Add'));
                dispatch(clearPollForm());
              }}
              type='button' className={`btn ${baseColor}`}>
              Add Poll
            </button>
          }
          {authedUser === params.user &&
          <form onSubmit={(e) => {
              e.preventDefault();
              if (pollForm.formType === 'Add') {
                dispatch(postAddPoll(
                  pollForm.name,
                  pollForm.options
                ));
              } else {
                dispatch(postEditPoll(
                  pollForm.name,
                  pollForm.options
                ));
              }
            }}>
            <h4>{pollForm.formType} Poll</h4>
            <div className='input-field'>
              <input
                value={pollForm.name}
                onChange={(e) => dispatch(changePollFormName(e.target.value))}
                type='text'
                placeholder='Poll Name'
                className='validate'
                disabled={pollForm.formType === 'Edit'}
                required
              />
            </div>
            <div className='input-field'>
              {pollForm.options.map((x, i) => (
                <input
                  key={i}
                  value={x}
                  onChange={(e) => dispatch(changePollFormOptions(
                    pollForm.options,
                    e.target.value,
                    i
                  ))}
                  type='text'
                  placeholder={`Option #${i+1}`}
                  className='validate'
                  required={i===0 || i===1}
                />
              ))}
            <button
              style={{marginBottom: '15px'}}
              className={`btn ${baseColor}`}
              type='submit'
              >Submit</button>
            </div>
          </form>}
          <div className='divider'/>
          <ul className='collection with-header'>
            <li className='collection-header'><h4>Active Polls</h4></li>
            {user.ownPolls.map((name, i) => (
              <li key={i} className='collection-item'>
                <div>
                  <Link
                    to={`/polls/${formatUrl(name, true)}`}
                  >{name}</Link>
                  {authedUser === params.user && <span><a
                    onClick={(e) => {
                      e.preventDefault();
                      if (confirm('Are you sure you want to delete this poll?')) {
                        dispatch(postDeletePoll(name));
                      }
                    }}
                    className='secondary-content'
                  >
                    <i className='delete material-icons'>delete</i>
                  </a>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(insertPollForm(name, 'Edit'));
                    }}
                    className='secondary-content'
                  >
                    <i className='mode-edit material-icons'>mode_edit</i>
                  </a></span>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  } else {
    return <div className='container'>
      <div className='row center'>
        <div className='col s12'>
          <h4>Unable to find the user:</h4>
          <h5>{params.user}</h5>
        </div>
      </div>
    </div>
  }
};
