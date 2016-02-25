import AppDispatcher from '../dispatcher/AppDispatcher';
import {ActionTypes} from '../constants/Constants';
import Ansible from '../utils/Ansible'

var FieldActions = {
  updateTimer(msg) {
    var timeLeft = msg.total_stage_time - msg.stage_time_so_far
    AppDispatcher.dispatch({
      type: ActionTypes.UPDATE_TIMER,
      timeLeft: timeLeft,
      stage: msg.stage_name
    });
  },
  updateHeart(msg) {
    AppDispatcher.dispatch({
      type: ActionTypes.UPDATE_HEART,
      state: msg.state
    });
  },
  updateRobot(msg) {
    AppDispatcher.dispatch({
      type: ActionTypes.UPDATE_ROBOT,
      autonomous: msg.autonomous,
      enabled: msg.enabled
    });
    if (msg.enabled) {
      Ansible.sendMessage('execute', {
        code: "print 'running'"
      });
    } else {
      Ansible.sendMessage('stop', {});
    }
  }
};

export default FieldActions;