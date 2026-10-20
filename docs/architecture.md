# Architecture

## State Ownership

| State | Owner | Description |
|-------|-------|-------------|
| `notes` | NotesContainer | Full list of user's notes |
| `selectedNote` | NotesContainer | Currently open note |
| `openNoteId` | Sidebar | Which note's dropdown is open |
| `title` | Editor | Local editable title |
| `content` | Editor | Local editable content |

## Prop Flow

```
NotesContainer
├── Sidebar
│   ├── notes
│   ├── onSelectedAction → setSelectedNote
│   └── onNoteDeletedAction → fetchNotes + clear if selected
├── Toolbar
│   └── onNoteCreatedAction → fetchNotes
└── Editor
    ├── selectedNote
    └── onNoteSavedAction → fetchNotes
```

## API Calls

| Component | Endpoint | Method | Trigger |
|-----------|----------|--------|---------|
| NotesContainer | /api/notes | GET | On mount, after create/save/delete |
| Toolbar | /api/notes | POST | New Note click |
| Editor | /api/notes/[id] | PATCH | 1s after last keystroke |
| Sidebar | /api/notes/[id] | DELETE | Delete button click |

## Database Schema

### anonymous_users

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | Primary Key, auto-generated |
| created_at | Timestamp | Not null, defaults to now |

### notes

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | Primary Key, auto-generated |
| anonymous_user_id | UUID | Not null, Foreign Key → anonymous_users.id |
| title | Text | Not null |
| content | Text | Not null |
| created_at | Timestamp | Not null, defaults to now |
| updated_at | Timestamp | Not null, defaults to now |
