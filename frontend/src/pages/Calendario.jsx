import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FixedMenu from '../components/FixedMenu';
import '../scss/Calendario.scss';
import Loading from '../components/Loading'
import { Link } from 'react-router-dom';

const Calendario = ({ id_curso, id_alumno }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isSmallScreen, setIsSmallScreen] = useState(null);
  const [isSuperSmallScreen, setIsSuperSmallScreen] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [tasks, setTasks] = useState();
  const [loading, setLoading] = useState(true)
  const [calendarLoading, setCalendarLoading] = useState(false)

  useEffect(() => {
    const fetchTasks = async () => {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();

      // Obtener el primer y último día del mes
      const firstDay = new Date(year, month, 1).toISOString().split('T')[0]; // YYYY-MM-DD
      const lastDay = new Date(year, month + 1, 0).toISOString().split('T')[0]; // Último día del mes

      try {
        const response = await fetch('http://localhost:3000/search_tasks_by_date', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id_curso,
            id_alumno,
            startDate: firstDay,
            endDate: lastDay,
          }),
        });

        if (!response.ok) {
          throw new Error('Error al cargar las publicaciones');
        }

        const data = await response.json();
        setTasks(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
        setCalendarLoading(false)
      }
    };

    fetchTasks();
  }, [id_curso, currentMonth, id_alumno]); // Dependencia en `currentMonth` para actualizar la búsqueda al cambiar de mes


  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 800);
      setIsSuperSmallScreen(window.innerWidth <= 380);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isSmallScreen === null) {
    return null;
  }

  const isToday = (day) => {
    const today = new Date();
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    return (
      day &&
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };



  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(month, year);

    // Ajustar para que lunes sea el primer día de la semana
    let firstDay = new Date(year, month, 1).getDay(); // 0 para domingo
    firstDay = (firstDay === 0 ? 6 : firstDay - 1); // 0 para lunes

    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const leadingEmptyDays = Array.from({ length: firstDay }, () => '');

    return [...leadingEmptyDays, ...daysArray];
  };


  const getTasksForDay = (day) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    return tasks.filter((task) => {
      const taskStart = new Date(task.created_at);
      const taskEnd = task.fecha_limite ? new Date(task.fecha_limite) : taskStart;
      const taskDate = new Date(year, month, day);

      // Comparar únicamente año, mes y día
      const isStartDay =
        taskStart.getFullYear() === taskDate.getFullYear() &&
        taskStart.getMonth() === taskDate.getMonth() &&
        taskStart.getDate() === taskDate.getDate();

      const isEndDay =
        taskEnd.getFullYear() === taskDate.getFullYear() &&
        taskEnd.getMonth() === taskDate.getMonth() &&
        taskEnd.getDate() === taskDate.getDate();

      return isStartDay || isEndDay;
    });
  };


  const handlePrevMonth = () => {
    setCalendarLoading(true)
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setCalendarLoading(true)
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
    setSelectedDay(null);
  };

  const calendarDays = generateCalendar();

  return (
    <>
      <Header calendario />

      <div id="main-content">
        <FixedMenu calendario />

        <div id="calendar-component">
          {loading ? (<Loading />) : (<>
            {tasks && (<div id="calendar-main-container">
              <div className="calendar-container">
                <div className="task-legend">
                  <span className="not-evaluable">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" /></svg>
                    <p>No Evaluable</p>
                  </span>
                  <span className="evaluable">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" /></svg>
                    <p>Evaluable</p>
                  </span>
                  <span className="end-evaluable">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" /></svg>
                    <p>Fin Evaluable</p>
                  </span>
                </div>

                <div id="calendar-header-container">
                  <div className="calendar-header">
                    <button onClick={handlePrevMonth}>❮</button>
                    <h2>
                      {currentMonth.toLocaleString('default', { month: 'long' }).replace(/^./, (c) => c.toUpperCase())} {currentMonth.getFullYear()}
                    </h2>
                    <button onClick={handleNextMonth}>❯</button>
                  </div>
                </div>
                <div className="calendar-grid">
                  {['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']
                    .map((day, index) => {
                      const shortDayNames = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];
                      return (
                        <div key={day} className="calendar-day-name">
                          <p>{isSuperSmallScreen ? shortDayNames[index] : day}</p>
                        </div>
                      );
                    })}

                  {!calendarLoading ? (
                    <>
                      {calendarDays.map((day, index) => {
                        if (!currentMonth || !day) {
                          return (
                            <div
                              key={index}
                              className="calendar-day empty"
                            />
                          );
                        }

                        const year = currentMonth.getFullYear();
                        const month = currentMonth.getMonth();
                        const taskDate = new Date(year, month, day);
                        const tasks = getTasksForDay(day) || [];

                        const isSelected = selectedDay === day;

                        return (
                          <div
                            key={index}
                            className={`calendar-day${isToday(day) ? ' today' : ''} ${isSelected ? 'selected' : ''}`}
                            onClick={() => setSelectedDay(day)}
                          >
                            <p>{day}</p>
                            <div className="tasks">
                              {tasks.map((task, i) => {

                                const createdAtDate = new Date(task.created_at)
                                const fecha_limite = new Date(task.fecha_limite)
                                const isStart = task.created_at && createdAtDate.getDate() === taskDate.getDate();
                                const isEnd = task.fecha_limite && fecha_limite.getDate() === taskDate.getDate();

                                return (
                                  <Link to={!isSmallScreen ? `/tareas/${task.id_publicacion}` : '/calendario'} key={`${index}-${i}`}>
                                    <div
                                      className={`task ${task.evaluable ? 'evaluable' : 'non-evaluable'}${!isStart && isEnd ? ' end-evaluable' : ''}`}
                                    >
                                      {!isSmallScreen && (
                                        <span>
                                          <span id='task-start'>{isStart && !isEnd ? 'Inicia:' : ''}{isEnd && !isStart ? 'Finaliza:' : ''}</span> {task.titulo} <span id="task-subject">({task.nombre_materia})</span>
                                        </span>
                                      )}
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : <Loading />}

                </div>
              </div>
            </div>)}

            {isSmallScreen && (
              selectedDay ?
                <div className="selected-day-tasks">
                  <h3>Tareas para el {selectedDay} de {currentMonth.toLocaleString('default', { month: 'long' })}</h3>

                  {getTasksForDay(selectedDay).length > 0 ? (
                    getTasksForDay(selectedDay).map((task, i) => {
                      const year = currentMonth.getFullYear();
                      const month = currentMonth.getMonth();
                      const createdAtDate = new Date(task.created_at)
                      const fecha_limite = new Date(task.fecha_limite)

                      const taskDate = new Date(year, month, selectedDay);
                      const isStart = createdAtDate.getTime() === taskDate.getTime();
                      const isEnd = task.fecha_limite && fecha_limite.getTime() === taskDate.getTime();

                      return (
                        <Link to={`/tareas/${task.id_publicacion}`} key={i}>
                          <div className={`task-detail ${task.evaluable ? 'evaluable' : 'non-evaluable'}${!isStart && isEnd && task.evaluable ? ' end-evaluable' : ''}`}>
                            <p>{isStart && !isEnd ? 'Inicia:' : ''}{isEnd && !isStart ? 'Finaliza:' : ''}  <strong>{task.titulo}</strong> ({task.nombre_materia})</p>
                          </div>
                        </Link>
                      );
                    })
                  ) : (
                    <p>No hay tareas para este día.</p>
                  )}
                </div> :
                <div className="selected-day-tasks">
                  <p>No hay Ningún día seleccionado</p>
                </div>

            )}
          </>)}
        </div>
      </div>
    </>
  );
};

export default Calendario;
