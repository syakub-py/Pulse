// eslint-disable-next-line no-undef
export default function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
	};
}
