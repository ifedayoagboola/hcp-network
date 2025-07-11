# Manual Testing Checklist

## 🔍 Search Functionality

### ✅ Search Existing Names
- [ ] Search for "Dr. Emily Carter" - should find and center on node
- [ ] Search for "Emily" - should find by partial match
- [ ] Search for "emily carter" - should work case-insensitive
- [ ] Search for "Dr. John Smith" - should find and center on node
- [ ] Search for "Alice" - should find Dr. Alice Brown

### ❌ Search Non-Existing Names
- [ ] Search for "Dr. Non Existent" - should show no results
- [ ] Search for "xyz" - should show no results
- [ ] Search for empty string - should show validation error
- [ ] Search for single character "a" - should show validation error
- [ ] Search for very long query (>50 chars) - should show validation error

### 🔧 Search Edge Cases
- [ ] Search with leading/trailing spaces - should trim and search
- [ ] Search with special characters - should handle gracefully
- [ ] Search while graph is animating - should still work
- [ ] Search multiple times rapidly - should handle without errors

## 🖱️ Node Interactions

### Hover
- [ ] Hover over any node - should show tooltip with name
- [ ] Hover over main node (Dr. Emily Carter) - should show tooltip
- [ ] Hover over connected nodes - should show tooltip
- [ ] Move mouse away from node - tooltip should disappear

### Click
- [ ] Click on Dr. Emily Carter - InfoPanel should update with her details
- [ ] Click on Dr. John Smith - InfoPanel should update with his details
- [ ] Click on Dr. Alice Brown - InfoPanel should update with her details
- [ ] Click on any other node - InfoPanel should update accordingly
- [ ] Click same node multiple times - should work without errors

### Visual Feedback
- [ ] Selected node should have blue border
- [ ] Main node should have different styling
- [ ] Node avatars should load properly
- [ ] Node sizes should be appropriate (main node larger)

## 🔗 Link Interactions

### Hover
- [ ] Hover over any connection line - should show link tooltip
- [ ] Hover over different types of connections - should show correct info
- [ ] Move mouse away from link - tooltip should disappear

### Click
- [ ] Click on "Co-authored" link - should show connection details popover
- [ ] Click on "Worked together" link - should show connection details
- [ ] Click on "Mentored" link - should show connection details
- [ ] Click outside tooltip - should close tooltip
- [ ] Press Escape key - should close tooltip

### Link Tooltip Content
- [ ] Tooltip should show connection type
- [ ] Tooltip should show connection details
- [ ] Tooltip should be positioned near click location
- [ ] Tooltip should not go off-screen

## 📱 Responsive Design

### Browser Resize
- [ ] Resize browser to mobile width (<768px) - sidebar should collapse
- [ ] Resize to tablet width (768px-1024px) - layout should adapt
- [ ] Resize to desktop width (>1024px) - full layout should show
- [ ] Resize rapidly - should handle without errors

### Mobile Layout
- [ ] Sidebar should be hidden by default on mobile
- [ ] Hamburger menu should appear in top-left
- [ ] Click hamburger menu - sidebar should slide in
- [ ] Click backdrop - sidebar should slide out
- [ ] InfoPanel and GraphCanvas should stack vertically

### Desktop Layout
- [ ] Sidebar should be visible on desktop
- [ ] InfoPanel and GraphCanvas should be side-by-side
- [ ] Proper proportions (40% InfoPanel, 60% GraphCanvas)

## 🎯 Edge Cases

### Single-Node Graph
- [ ] Test with only one HCP node - should render properly
- [ ] No connections should be visible
- [ ] Clicking the single node should work
- [ ] Search should still work

### No Connections
- [ ] Test with nodes but no links - should render properly
- [ ] Graph should show only nodes
- [ ] Node interactions should still work
- [ ] No link tooltips should appear

### Empty Graph
- [ ] Test with no nodes - should handle gracefully
- [ ] Search should show appropriate message
- [ ] No errors should be thrown

### Network Issues
- [ ] Disconnect internet - avatar images should show fallback
- [ ] Slow network - should show loading states
- [ ] Failed image loads - should handle gracefully

## ⌨️ Accessibility

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Enter key should activate buttons
- [ ] Escape key should close tooltips/panels
- [ ] Arrow keys should work for navigation

### Screen Reader
- [ ] All images should have alt text
- [ ] Buttons should have proper labels
- [ ] Form inputs should have proper labels
- [ ] Tooltips should be announced

### Focus Management
- [ ] Focus should be visible on all interactive elements
- [ ] Focus should not be trapped in modals
- [ ] Focus should move logically through interface

## 🎨 Visual Polish

### Styling Consistency
- [ ] All colors should match design system
- [ ] Spacing should be consistent
- [ ] Typography should be appropriate
- [ ] Shadows and borders should be consistent

### Animations
- [ ] Sidebar slide animation should be smooth
- [ ] Tooltip appearance should be smooth
- [ ] Graph animations should be smooth
- [ ] No jarring movements or flickers

### Performance
- [ ] Graph should render quickly
- [ ] Interactions should be responsive
- [ ] No memory leaks during extended use
- [ ] Smooth scrolling in InfoPanel

## 🐛 Error Handling

### Invalid Input
- [ ] Empty search should show validation error
- [ ] Short search should show validation error
- [ ] Long search should show validation error
- [ ] Special characters should be handled

### Network Errors
- [ ] Failed API calls should show appropriate messages
- [ ] Image load failures should show fallbacks
- [ ] App should remain functional with network issues

### Browser Compatibility
- [ ] Test in Chrome - should work properly
- [ ] Test in Firefox - should work properly
- [ ] Test in Safari - should work properly
- [ ] Test in Edge - should work properly

## 📊 Data Validation

### Mock Data
- [ ] All HCPs should have required fields
- [ ] All links should have valid source/target
- [ ] Avatar URLs should be accessible
- [ ] Data should be consistent

### State Management
- [ ] Selected node state should persist correctly
- [ ] Search state should be maintained
- [ ] Tooltip state should reset properly
- [ ] No state conflicts between components

---

## 🚀 How to Run Tests

1. **Unit Tests:**
   ```bash
   npm test
   ```

2. **Manual Testing:**
   - Open the application in browser
   - Go through each checklist item systematically
   - Test on different screen sizes
   - Test with different browsers

3. **Accessibility Testing:**
   - Use browser dev tools accessibility tab
   - Test with screen reader
   - Test keyboard-only navigation

4. **Performance Testing:**
   - Use browser dev tools performance tab
   - Monitor memory usage
   - Test with large datasets 