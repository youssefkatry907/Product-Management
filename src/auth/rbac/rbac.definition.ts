import rbac from 'easy-rbac';

export default rbac.create({
  admin: {
    can: [
      'products:create',
      'products:read',
      'products:update',
      'products:delete',
      'users:read',
    ],
  },
  user: {
    can: [
      'auth:register',
      'auth:login',
      'products:read',
    ],
  },
});