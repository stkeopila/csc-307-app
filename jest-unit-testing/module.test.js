import mut from './module.js'; // MUT = Module Under Test

// Testing sum
test ('Testing sum -- success', () => {
    const expected = 30;
    const got = mut.sum(12, 18);
    expect(got).toBe(expected);
});

test ('Testing sum -- success', () => {
    const expected = 40;
    const got = mut.sum(22, 18);
    expect(got).toBe(expected)
})

// Testing div
test ('Testing div -- success', () => {
    const expected = 3;
    const got = mut.div(12, 4);
    expect(got).toBe(expected);
})

test ('Testing div -- error', () => {
    expect(() => mut.div(12, 0)).toThrow(Error);
})

test ('Testing div -- failt', () => {
    const expected = 0;
    const got = mut.div(0, 4);
    expect(got).toBe(expected);
})

// Testing containsNumbers
test ('Testing containsNumbers -- success', () => {
    const expected = true;
    const got = mut.containsNumbers("0");
    expect(got).toBe(expected);
})

test ('Testing containsNumbers -- success', () => {
    const expected = false;
    const got = mut.containsNumbers("hi");
    expect(got).toBe(expected);
})

test ('Testing containsNumbers -- success', () => {
    const expected = true;
    const got = mut.containsNumbers("asdasfdfa0");
    expect(got).toBe(expected);
})

test ('Testing containsNumbers -- success', () => {
    const expected = false;
    const got = mut.containsNumbers("");
    expect(got).toBe(expected);
})

// Error where spaces are not numbers - will have to change code to make it only pass in ints
test ('Testing containsNumbers -- success', () => {
    const expected = false;
    const got = mut.containsNumbers(" ");
    expect(got).toBe(expected);
})