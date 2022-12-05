// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
import {Crane} from "./crane";

expect.extend(matchers);

test("Day 1 puzzle a sample", () => {
  const input =
`    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

  let crane = new Crane(input);
  expect(crane.getTopCraneItems()).toEqual('CMZ');
});
