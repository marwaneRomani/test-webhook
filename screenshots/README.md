# Screenshots Directory

This directory should contain the following screenshots for the French README:

## Required Screenshots:

1. **main-interface.png** - Interface principale de l'application
2. **features-demo.png** - Démonstration des fonctionnalités principales
3. **architecture-diagram.png** - Diagramme d'architecture des services
4. **docker-build.png** - Processus de construction Docker
5. **app-running.png** - Application en cours d'exécution
6. **dev-mode.png** - Mode développement avec rechargement automatique
7. **desktop-view.png** - Vue desktop de l'application
8. **mobile-view.png** - Vue mobile responsive
9. **adding-todo.png** - Processus d'ajout d'une nouvelle tâche
10. **deleting-todo.png** - Suppression d'une tâche existante
11. **health-status.png** - Indicateur de statut de connexion Redis
12. **api-testing.png** - Test des endpoints API avec curl ou Postman
13. **tech-stack.png** - Stack technologique utilisé
14. **docker-commands.png** - Exemples de commandes Docker en action
15. **troubleshooting.png** - Interface de dépannage et logs

## How to Take Screenshots:

1. **Start the application:**
   ```bash
   docker-compose up --build
   ```

2. **Open browser to http://localhost:3000**

3. **Take screenshots of:**
   - Main interface (empty state)
   - Adding a todo
   - Interface with several todos
   - Deleting a todo
   - Mobile view (use browser dev tools)
   - Health status indicator

4. **For Docker screenshots:**
   - Terminal showing `docker-compose up --build`
   - Terminal showing `docker-compose logs`
   - Terminal showing `docker-compose ps`

5. **For API testing:**
   - Use Postman or curl commands
   - Show GET /api/todos response
   - Show POST /api/todos request

## Recommended Tools:

- **macOS:** Screenshot (Cmd+Shift+4)
- **Windows:** Snipping Tool or Snip & Sketch
- **Linux:** GNOME Screenshot or Flameshot
- **Browser:** Built-in developer tools for mobile view

## Image Specifications:

- Format: PNG preferred
- Resolution: At least 1200px width for desktop views
- Mobile screenshots: 375px width typical
- Compress images to keep file sizes reasonable
- Use descriptive filenames as listed above
