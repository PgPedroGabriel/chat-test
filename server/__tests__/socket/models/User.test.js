import User from '../../../src/socket/models/User';

describe('Socket -> Model -> User', () => {
  it('user can be created', () => {
    const user = new User('pedro');

    expect(user.username).toBe('pedro');
  });
});
