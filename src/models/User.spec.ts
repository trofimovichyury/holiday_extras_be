import User from './User';

describe('User', () => {
  let user: User;

  beforeEach(() => {
    user = new User();
  });

  it('deleteUser()', () => {
    const deleteSpy = jest.fn().mockImplementation(() => true);
    // @ts-ignore
    user.storage = {
      delete: deleteSpy,
      has: () => true,
    };
    user.deleteUser('1');

    expect(deleteSpy).toHaveBeenCalledWith('1');
  });
});