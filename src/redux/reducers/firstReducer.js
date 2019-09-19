const TEST_ACTION = "test/TEST_ACTION";

export const initialState = {
  test: "a",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TEST_ACTION:
      return {
        ...state,
        test: action.payload.action,
      };
    default:
      return state;
  }
}

export const testAction = action => ({
  type: TEST_ACTION,
  payload: { action },
});
