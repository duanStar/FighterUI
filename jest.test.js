test('common matcher', () => {
  expect(2 + 2).toBe(4);
  expect(2 + 2).not.toBe(5);
});

test('to be true or false', () => {
  expect(1).toBeTruthy();
  expect(0).toBeFalsy();
});

test('number', () => {
  expect(4).toBeGreaterThan(3);
  expect(2).toBeLessThanOrEqual(2);
});

test('object', () => {
  expect({ name: 'zs'}).toEqual({name: 'zs'});
});