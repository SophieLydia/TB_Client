import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./components/Home')
  },
  {
    path: '*',
    name: 'error',
    component: () => import('./components/Error')
  },
  {
    path: '/people/add',
    name: 'people add',
    component: () => import('./components/person/AddPerson')
  },
  {
    path: '/people/list',
    name: 'people list',
    component: () => import('./components/person/PeopleList')
  },
  {
    path: '/people/:id',
    name: 'people',
    component: () => import('./components/person/ViewPerson')
  },
  {
    path: '/people/update/:id',
    name: 'people update',
    component: () => import('./components/person/UpdatePerson')
  },
  {
    path: '/boss/:id',
    name: 'boss',
    component: () => import('./components/person/boss/ViewBoss')
  },
  {
    path: '/assistant/:id',
    name: 'assistant',
    component: () => import('./components/person/assistant/ViewAssistant')
  },
  {
    path: '/assistant/add/:id',
    name: 'assistant add',
    component: () => import('./components/person/assistant/AddAssistant')
  },
  {
    path: '/assistant/update/:id',
    name: 'assistant update',
    component: () => import('./components/person/assistant/UpdateAssistant')
  },
  {
    path: '/child/:id',
    name: 'child',
    component: () => import('./components/person/child/ViewChild')
  },
  {
    path: '/child/add/:id',
    name: 'child add',
    component: () => import('./components/person/child/AddChild')
  },
  {
    path: '/child/update/:id',
    name: 'child update',
    component: () => import('./components/person/child/UpdateChild')
  },
  {
    path: '/courses/list',
    name: 'courses list',
    component: () => import('./components/course/CoursesList')
  },
  {
    path: '/courses/add',
    name: 'courses add',
    component: () => import('./components/course/AddCourse')
  },
  {
    path: '/courses/:id',
    name: 'courses',
    component: () => import('./components/course/ViewCourse')
  },
  {
    path: '/courses/update/:id',
    name: 'courses update',
    component: () => import('./components/course/UpdateCourse')
  },
  {
    path: '/classes/list',
    name: 'classes list',
    component: () => import('./components/class/ClassesList')
  },
  {
    path: '/classes/add',
    name: 'classes add',
    component: () => import('./components/class/AddClass')
  },
  {
    path: '/classes/:id',
    name: 'classes',
    component: () => import('./components/class/ViewClass')
  },
  {
    path: '/classes/update/:id',
    name: 'classes update',
    component: () => import('./components/class/UpdateClass')
  },
  {
    path: '/cantons/list',
    name: 'cantons list',
    component: () => import('./components/canton/CantonsList')
  },
  {
    path: '/cantons/add',
    name: 'cantons add',
    component: () => import('./components/canton/AddCanton')
  },
  {
    path: '/cantons/:id',
    name: 'cantons',
    component: () => import('./components/canton/ViewCanton')
  },
  {
    path: '/cantons/update/:id',
    name: 'cantons update',
    component: () => import('./components/canton/UpdateCanton')
  },
  {
    path: '/teachings/list',
    name: 'teachings list',
    component: () => import('./components/teaching/TeachingsList')
  },
  {
    path: '/teachings/add',
    name: 'teachings add',
    component: () => import('./components/teaching/AddTeaching')
  },
  {
    path: '/teachings/:id',
    name: 'teachings',
    component: () => import('./components/teaching/ViewTeaching')
  },
  {
    path: '/teachings/update/:id',
    name: 'teachings update',
    component: () => import('./components/teaching/UpdateTeaching')
  },
  {
    path: '/themes/list',
    name: 'themes list',
    component: () => import('./components/theme/ThemesList')
  },
  {
    path: '/themes/add',
    name: 'themes add',
    component: () => import('./components/theme/AddTheme')
  },
  {
    path: '/themes/:id',
    name: 'themes',
    component: () => import('./components/theme/ViewTheme')
  },
  {
    path: '/themes/update/:id',
    name: 'themes update',
    component: () => import('./components/theme/UpdateTheme')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router