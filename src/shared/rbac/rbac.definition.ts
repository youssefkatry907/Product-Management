import rbac from 'easy-rbac';

export default rbac.create({
  admin: {
    can: [
      'product:create',
      'product:get',
      'product:update',
      'product:delete',
      'user:get',
    ],
  },
  user: {
    can: [
      'auth:register',
      'auth:login',
      'product:get',
    ],
  },
});