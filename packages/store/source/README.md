Structure
=========

Stores - Contains the Root Reducer, tracks which service group to call
Store - Each is its own reducer, maps to service group. These also define actions. When a user uses a Civility component, it gets its data from the reducer state of each Store.
