# Testing & QA Guide

## 🧪 Unit Testing Setup

### 1. Install Dependencies
```bash
npm install --save-dev jest @types/jest jest-environment-jsdom ts-jest @testing-library/react @testing-library/jest-dom
```

### 2. Run Unit Tests
```bash
npm test
npm run test:watch
npm run test:coverage
```

### 3. Test Files Structure
```
src/
├── utils/
│   ├── searchUtils.ts          # Pure functions for testing
│   └── __tests__/
│       └── searchUtils.test.ts # Unit tests
├── data/
│   └── testData.ts             # Test data for edge cases
└── setupTests.ts               # Jest configuration
```

## 🔍 Manual Testing Checklist

### Search Functionality Testing

#### ✅ Search Existing Names
- [ ] **"Dr. Emily Carter"** - Should find and center on node
- [ ] **"Emily"** - Should find by partial match
- [ ] **"emily carter"** - Should work case-insensitive
- [ ] **"Dr. John Smith"** - Should find and center on node
- [ ] **"Alice"** - Should find Dr. Alice Brown

#### ❌ Search Non-Existing Names
- [ ] **"Dr. Non Existent"** - Should show no results
- [ ] **"xyz"** - Should show no results
- [ ] **Empty string** - Should show validation error
- [ ] **Single character "a"** - Should show validation error
- [ ] **Very long query (>50 chars)** - Should show validation error

#### 🔧 Search Edge Cases
- [ ] **Leading/trailing spaces** - Should trim and search
- [ ] **Special characters** - Should handle gracefully
- [ ] **Search during graph animation** - Should still work
- [ ] **Rapid searches** - Should handle without errors

### Node Interactions Testing

#### Hover
- [ ] **Hover over any node** - Should show tooltip with name
- [ ] **Hover over main node** - Should show tooltip
- [ ] **Hover over connected nodes** - Should show tooltip
- [ ] **Move mouse away** - Tooltip should disappear

#### Click
- [ ] **Click Dr. Emily Carter** - InfoPanel should update with her details
- [ ] **Click Dr. John Smith** - InfoPanel should update with his details
- [ ] **Click Dr. Alice Brown** - InfoPanel should update with her details
- [ ] **Click same node multiple times** - Should work without errors

#### Visual Feedback
- [ ] **Selected node** - Should have blue border
- [ ] **Main node** - Should have different styling
- [ ] **Node avatars** - Should load properly
- [ ] **Node sizes** - Should be appropriate (main node larger)

### Link Interactions Testing

#### Hover
- [ ] **Hover over connection line** - Should show link tooltip
- [ ] **Hover over different connection types** - Should show correct info
- [ ] **Move mouse away** - Tooltip should disappear

#### Click
- [ ] **Click "Co-authored" link** - Should show connection details popover
- [ ] **Click "Worked together" link** - Should show connection details
- [ ] **Click "Mentored" link** - Should show connection details
- [ ] **Click outside tooltip** - Should close tooltip
- [ ] **Press Escape key** - Should close tooltip

### Responsive Design Testing

#### Browser Resize
- [ ] **Mobile width (<768px)** - Sidebar should collapse
- [ ] **Tablet width (768px-1024px)** - Layout should adapt
- [ ] **Desktop width (>1024px)** - Full layout should show
- [ ] **Rapid resize** - Should handle without errors

#### Mobile Layout
- [ ] **Sidebar hidden by default** - On mobile
- [ ] **Hamburger menu appears** - In top-left
- [ ] **Click hamburger menu** - Sidebar should slide in
- [ ] **Click backdrop** - Sidebar should slide out
- [ ] **InfoPanel and GraphCanvas stack** - Vertically

#### Desktop Layout
- [ ] **Sidebar visible** - On desktop
- [ ] **InfoPanel and GraphCanvas side-by-side** - Proper layout
- [ ] **Proper proportions** - 40% InfoPanel, 60% GraphCanvas

## 🎯 Edge Cases Testing

### Single-Node Graph
```typescript
// Use testData.singleNodeGraph
import { singleNodeGraph } from './data/testData';
```
- [ ] **Only one HCP node** - Should render properly
- [ ] **No connections visible** - Should handle gracefully
- [ ] **Clicking the single node** - Should work
- [ ] **Search functionality** - Should still work

### No Connections
```typescript
// Use testData.noConnectionsGraph
import { noConnectionsGraph } from './data/testData';
```
- [ ] **Nodes but no links** - Should render properly
- [ ] **Graph shows only nodes** - No connection lines
- [ ] **Node interactions work** - Clicking nodes should work
- [ ] **No link tooltips** - Should not appear

### Empty Graph
```typescript
// Use testData.emptyGraph
import { emptyGraph } from './data/testData';
```
- [ ] **No nodes** - Should handle gracefully
- [ ] **Search shows appropriate message** - No results message
- [ ] **No errors thrown** - Should be stable

### Performance Testing
```typescript
// Use testData.largeGraph
import { largeGraph } from './data/testData';
```
- [ ] **50 nodes, 100 connections** - Should render smoothly
- [ ] **Interactions remain responsive** - Clicking and hovering
- [ ] **No memory leaks** - During extended use
- [ ] **Smooth animations** - Graph should animate properly

## ⌨️ Accessibility Testing

### Keyboard Navigation
- [ ] **Tab through elements** - All interactive elements
- [ ] **Enter key activation** - Buttons and links
- [ ] **Escape key** - Close tooltips/panels
- [ ] **Arrow keys** - Navigation within components

### Screen Reader
- [ ] **Alt text on images** - All images have proper alt text
- [ ] **Button labels** - All buttons have proper labels
- [ ] **Form input labels** - All inputs have proper labels
- [ ] **Tooltip announcements** - Screen reader announces tooltips

### Focus Management
- [ ] **Visible focus** - On all interactive elements
- [ ] **No focus traps** - In modals
- [ ] **Logical focus order** - Through interface

## 🐛 Error Handling Testing

### Invalid Input
- [ ] **Empty search** - Shows validation error
- [ ] **Short search** - Shows validation error
- [ ] **Long search** - Shows validation error
- [ ] **Special characters** - Handled gracefully

### Network Issues
- [ ] **Disconnect internet** - Avatar images show fallback
- [ ] **Slow network** - Shows loading states
- [ ] **Failed image loads** - Handled gracefully

### Browser Compatibility
- [ ] **Chrome** - Should work properly
- [ ] **Firefox** - Should work properly
- [ ] **Safari** - Should work properly
- [ ] **Edge** - Should work properly

## 📊 Data Validation Testing

### Mock Data Integrity
- [ ] **All HCPs have required fields** - id, name, avatarUrl, etc.
- [ ] **All links have valid source/target** - Valid node IDs
- [ ] **Avatar URLs are accessible** - Images load properly
- [ ] **Data is consistent** - No orphaned references

### State Management
- [ ] **Selected node state persists** - Correctly maintained
- [ ] **Search state maintained** - During interactions
- [ ] **Tooltip state resets** - Properly
- [ ] **No state conflicts** - Between components

## 🚀 How to Run Complete Testing

### 1. Automated Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### 2. Manual Testing
1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open browser and go through checklist:**
   - Use the `TESTING_CHECKLIST.md` file
   - Test on different screen sizes
   - Test with different browsers

3. **Test edge cases:**
   - Replace `mockGraph` with test data from `testData.ts`
   - Test single-node, no-connections, and empty graphs

### 3. Accessibility Testing
1. **Use browser dev tools:**
   - Accessibility tab
   - Lighthouse audit
   - Color contrast checker

2. **Test with screen reader:**
   - NVDA (Windows)
   - VoiceOver (Mac)
   - JAWS (Windows)

3. **Keyboard-only navigation:**
   - Disable mouse
   - Navigate with Tab, Enter, Escape, Arrow keys

### 4. Performance Testing
1. **Use browser dev tools:**
   - Performance tab
   - Memory tab
   - Network tab

2. **Test with large datasets:**
   - Use `largeGraph` from test data
   - Monitor memory usage
   - Check for memory leaks

## 📝 Test Results Template

### Test Session
- **Date:** [Date]
- **Tester:** [Name]
- **Browser:** [Browser + Version]
- **Screen Size:** [Width x Height]

### Results Summary
- **Total Tests:** [Number]
- **Passed:** [Number]
- **Failed:** [Number]
- **Skipped:** [Number]

### Issues Found
1. **Issue 1:** [Description]
   - **Severity:** [High/Medium/Low]
   - **Steps to reproduce:** [Steps]
   - **Expected:** [Expected behavior]
   - **Actual:** [Actual behavior]

2. **Issue 2:** [Description]
   - **Severity:** [High/Medium/Low]
   - **Steps to reproduce:** [Steps]
   - **Expected:** [Expected behavior]
   - **Actual:** [Actual behavior]

### Recommendations
- [Recommendation 1]
- [Recommendation 2]
- [Recommendation 3] 