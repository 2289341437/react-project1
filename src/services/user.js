import request from '@/utils/request';
export async function query(props) {
  return request('/api/users',{
    method:post,
  });
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}
