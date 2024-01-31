declare const Ref: unique symbol;

interface Runtime {
	useInstance<
		T extends keyof CreatableInstances,
		R extends { [Ref]: string },
		O extends { __instance: CreatableInstances[T] } & { __plasma: R },
	>(
		this: void,
		creator: (ref: typeof Ref) => O,
	): { [K in O["__plasma"][typeof Ref]]: O["__instance"] };
}

declare function create<
	T extends keyof CreatableInstances,
	R extends { [Ref]: string },
	K extends CreatableInstances[T] & { __instance: CreatableInstances[T]; __plasma: R },
>(className: T, props: R & Partial<WritableInstanceProperties<CreatableInstances[T]>> & { [index: number]: K }): K;

declare const Runtime: Runtime;

const a = Runtime.useInstance((ref) => {
	return create("Part", {
		Size: Vector3.zero,
		[ref]: "hello",
		[1]: create("Part", {}),
	});
});

const b = a["a"];

// a should be { hello: Part }
