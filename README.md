# Scope

An example personality test application, that takes 3 different questions, maps them into a score and produces a personality trait of either Introvert or Extrovert.

The questions are from https://www.psychologies.co.uk/self/are-you-an-introvert-or-an-extrovert.html

# Usage

The application is reachable at http://localhost:8000 after running (on [Deno](https://deno.land/)):

`deno run --allow-env --allow-net --allow-read --import-map=vendor/import_map.json server.ts`

Tests run with:

`deno run --allow-env --allow-net --allow-read --import-map=vendor/import_map.json test.ts`
