const addDecorator = require("@storybook/react").addDecorator;

const ThemedWrapper = require("./ThemedWrapper");

addDecorator(renderStory => <ThemedWrapper>{renderStory()}</ThemedWrapper>);
