# Architecture

## State Ownership

| State          | Owner          | Type              | Description                       |
| -------------- | -------------- | ----------------- | --------------------------------- |
| `notes`        | NotesContainer | `Note[]`          | Full list of user's notes         |
| `selectedNote` | NotesContainer | `Note \| null`          | Currently open note                   |
| `openNoteId`   | Sidebar        | `string \| null`        | Which note's options dropdown is open |
| `modal`        | Sidebar        | `{ type, noteId } \| null` | Active modal type and target note  |
| `renameValue`  | Sidebar        | `string`          | Current value of the rename input |
| `title`        | Editor         | `string`          | Local editable title              |
| `content`      | Editor         | `string`          | Local editable content            |

## Prop Flow

```
NotesContainer
├── Sidebar
│   ├── notes: Note[]
│   ├── onSelectedAction → setSelectedNote
│   ├── onNoteDeletedAction(deletedId) → fetchNotes + clear selectedNote if match
│   └── onNoteRenamedAction(renamedId, newTitle) → fetchNotes + update selectedNote title if match
├── Toolbar
│   └── onNoteCreatedAction → fetchNotes
└── Editor
    ├── selectedNote: Note | null
    └── onNoteSavedAction → fetchNotes
```

## API Calls

| Component      | Endpoint        | Method | Trigger                                   |
| -------------- | --------------- | ------ | ----------------------------------------- |
| NotesContainer | /api/notes      | GET    | On mount, after create/save/delete/rename |
| Toolbar        | /api/notes      | POST   | New Note click                            |
| Editor         | /api/notes/[id] | PATCH  | 1s after last keystroke (debounced)       |
| Sidebar        | /api/notes/[id] | PATCH  | Rename confirm in modal                   |
| Sidebar        | /api/notes/[id] | DELETE | Delete confirm in modal                   |

## Shared Types

Defined in `src/types/index.ts`:

```ts
type Note = {
  id: string;
  title: string;
  content: string;
};
```

## Database Schema

### anonymous_users

| Column     | Type      | Constraints                 |
| ---------- | --------- | --------------------------- |
| id         | UUID      | Primary Key, auto-generated |
| created_at | Timestamp | Not null, defaults to now   |

### notes

| Column            | Type      | Constraints                                |
| ----------------- | --------- | ------------------------------------------ |
| id                | UUID      | Primary Key, auto-generated                |
| anonymous_user_id | UUID      | Not null, Foreign Key → anonymous_users.id |
| title             | Text      | Not null                                   |
| content           | Text      | Not null                                   |
| created_at        | Timestamp | Not null, defaults to now                  |
| updated_at        | Timestamp | Not null, defaults to now                  |
