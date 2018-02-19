export function throwError(msg: string): never{
  throw new Error(msg);
}

function html([first, ...strings], ...values: any[]) {
	return values.reduce(
        (acc, cur) => acc.concat(cur, strings.shift()),
        [first]
    )

    // Filter out interpolations which are bools, null or undefined.
    .filter((x:boolean|null|undefined) => x && x !== true)
    .join("");
}