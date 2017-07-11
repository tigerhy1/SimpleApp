export const ADD_QUOTE_SET_CONTENT = 'ADD_QUOTE_SET_CONTENT'
export const ADD_QUOTE_SET_FROM = 'ADD_QUOTE_SET_FROM'
export const ADD_QUOTE_SUBMIT_FINISH = 'ADD_QUOTE_SUBMIT_FINISH'

export function setContent(content){
  return {
    type: ADD_QUOTE_SET_CONTENT,
    payload: content
  }
}

export function setFrom(from) {
  return {
    type: ADD_QUOTE_SET_FROM,
    payload: from
  }
}

export function submitFinish() {
  return {
    type: ADD_QUOTE_SUBMIT_FINISH
  }
}
