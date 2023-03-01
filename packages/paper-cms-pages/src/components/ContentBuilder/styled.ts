import { Accordion, Box } from '@techstack/components';
import styled from 'styled-components';

export const StyledItem = styled.div<{ isDragging?: boolean }>`
  user-select: none;
  padding: ${p => p.theme.space[5]};
  margin: 0 0 ${p => p.theme.space[3]} 0;
  background: ${p =>
    p.isDragging ? p.theme.colors.neutrals[9] : p.theme.colors.neutrals[7]};
  border-radius: ${p => p.theme.radii[2]};
  cursor: move;
  cursor: grab;
`;

export const StyledList = styled.div<{ isDraggingOver?: boolean }>`
  background: ${p =>
    p.isDraggingOver ? p.theme.colors.neutrals[6] : p.theme.colors.neutrals[5]};
  padding: ${p => p.theme.space[4]} 0;
  border-radius: ${p => p.theme.radii[2]};
`;

export const EditorWrapper = styled(Box)`
  width: 100%;

  > div {
    width: 100%;
  }

  .quill {
    color: ${p => p.theme.colors.text};
    background: ${p => p.theme.colors.neutrals[0]};

    .ql-snow.ql-toolbar button:hover .ql-stroke,
    .ql-snow .ql-toolbar button:hover .ql-stroke,
    .ql-snow.ql-toolbar button:focus .ql-stroke,
    .ql-snow .ql-toolbar button:focus .ql-stroke,
    .ql-snow.ql-toolbar button.ql-active .ql-stroke,
    .ql-snow .ql-toolbar button.ql-active .ql-stroke,
    .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
    .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,
    .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
    .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,
    .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,
    .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke,
    .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
    .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
    .ql-snow.ql-toolbar button:hover .ql-stroke-miter,
    .ql-snow .ql-toolbar button:hover .ql-stroke-miter,
    .ql-snow.ql-toolbar button:focus .ql-stroke-miter,
    .ql-snow .ql-toolbar button:focus .ql-stroke-miter,
    .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,
    .ql-snow .ql-toolbar button.ql-active .ql-stroke-miter,
    .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
    .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
    .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
    .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
    .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
    .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
    .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,
    .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {
      stroke: ${p => p.theme.colors.highlights[0]};
    }

    .ql-snow.ql-toolbar button:hover,
    .ql-snow .ql-toolbar button:hover,
    .ql-snow.ql-toolbar button:focus,
    .ql-snow .ql-toolbar button:focus,
    .ql-snow.ql-toolbar button.ql-active,
    .ql-snow .ql-toolbar button.ql-active,
    .ql-snow.ql-toolbar .ql-picker-label:hover,
    .ql-snow .ql-toolbar .ql-picker-label:hover,
    .ql-snow.ql-toolbar .ql-picker-label.ql-active,
    .ql-snow .ql-toolbar .ql-picker-label.ql-active,
    .ql-snow.ql-toolbar .ql-picker-item:hover,
    .ql-snow .ql-toolbar .ql-picker-item:hover,
    .ql-snow.ql-toolbar .ql-picker-item.ql-selected,
    .ql-snow .ql-toolbar .ql-picker-item.ql-selected {
      color: ${p => p.theme.colors.highlights[0]};
    }

    .ql-editor {
      min-height: ${p => p.theme.sizes[16]};
    }

    .ql-toolbar {
      .ql-formats {
        .ql-header {
          color: ${p => p.theme.colors.text};
        }

        .ql-stroke {
          stroke: ${p => p.theme.colors.text};
        }
      }
    }
  }
`;

export const StyledAccordion = styled(Accordion)``;
